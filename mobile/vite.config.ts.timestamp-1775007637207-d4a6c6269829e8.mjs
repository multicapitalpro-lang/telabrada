// vite.config.ts
import { defineConfig } from "file:///C:/Users/user/Downloads/brada/mobile/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/user/Downloads/brada/mobile/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/user/Downloads/brada/mobile/node_modules/lovable-tagger/dist/index.js";
import { viteObfuscateFile } from "file:///C:/Users/user/Downloads/brada/mobile/node_modules/vite-plugin-obfuscator/index.js";
var __vite_injected_original_dirname = "C:\\Users\\user\\Downloads\\brada\\mobile";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    }
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && viteObfuscateFile({
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.75,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.4,
      debugProtection: true,
      debugProtectionInterval: 2e3,
      disableConsoleOutput: true,
      identifierNamesGenerator: "hexadecimal",
      renameGlobals: false,
      selfDefending: true,
      stringArray: true,
      stringArrayCallsTransform: true,
      stringArrayEncoding: ["base64"],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 2,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersType: "function",
      stringArrayThreshold: 0.75,
      splitStrings: true,
      splitStringsChunkLength: 10,
      transformObjectKeys: true,
      unicodeEscapeSequence: false
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFx1c2VyXFxcXERvd25sb2Fkc1xcXFxicmFkYVxcXFxtb2JpbGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHVzZXJcXFxcRG93bmxvYWRzXFxcXGJyYWRhXFxcXG1vYmlsZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvdXNlci9Eb3dubG9hZHMvYnJhZGEvbW9iaWxlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG4vLyBAdHMtZXhwZWN0LWVycm9yIHZpdGUtcGx1Z2luLW9iZnVzY2F0b3Igblx1MDBFM28gcHVibGljYSB0aXBvcyBUeXBlU2NyaXB0XG5pbXBvcnQgeyB2aXRlT2JmdXNjYXRlRmlsZSB9IGZyb20gXCJ2aXRlLXBsdWdpbi1vYmZ1c2NhdG9yXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgICBobXI6IHtcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKSxcbiAgICBtb2RlID09PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgdml0ZU9iZnVzY2F0ZUZpbGUoe1xuICAgICAgICBjb21wYWN0OiB0cnVlLFxuICAgICAgICBjb250cm9sRmxvd0ZsYXR0ZW5pbmc6IHRydWUsXG4gICAgICAgIGNvbnRyb2xGbG93RmxhdHRlbmluZ1RocmVzaG9sZDogMC43NSxcbiAgICAgICAgZGVhZENvZGVJbmplY3Rpb246IHRydWUsXG4gICAgICAgIGRlYWRDb2RlSW5qZWN0aW9uVGhyZXNob2xkOiAwLjQsXG4gICAgICAgIGRlYnVnUHJvdGVjdGlvbjogdHJ1ZSxcbiAgICAgICAgZGVidWdQcm90ZWN0aW9uSW50ZXJ2YWw6IDIwMDAsXG4gICAgICAgIGRpc2FibGVDb25zb2xlT3V0cHV0OiB0cnVlLFxuICAgICAgICBpZGVudGlmaWVyTmFtZXNHZW5lcmF0b3I6IFwiaGV4YWRlY2ltYWxcIixcbiAgICAgICAgcmVuYW1lR2xvYmFsczogZmFsc2UsXG4gICAgICAgIHNlbGZEZWZlbmRpbmc6IHRydWUsXG4gICAgICAgIHN0cmluZ0FycmF5OiB0cnVlLFxuICAgICAgICBzdHJpbmdBcnJheUNhbGxzVHJhbnNmb3JtOiB0cnVlLFxuICAgICAgICBzdHJpbmdBcnJheUVuY29kaW5nOiBbXCJiYXNlNjRcIl0sXG4gICAgICAgIHN0cmluZ0FycmF5SW5kZXhTaGlmdDogdHJ1ZSxcbiAgICAgICAgc3RyaW5nQXJyYXlSb3RhdGU6IHRydWUsXG4gICAgICAgIHN0cmluZ0FycmF5U2h1ZmZsZTogdHJ1ZSxcbiAgICAgICAgc3RyaW5nQXJyYXlXcmFwcGVyc0NvdW50OiAyLFxuICAgICAgICBzdHJpbmdBcnJheVdyYXBwZXJzQ2hhaW5lZENhbGxzOiB0cnVlLFxuICAgICAgICBzdHJpbmdBcnJheVdyYXBwZXJzVHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBzdHJpbmdBcnJheVRocmVzaG9sZDogMC43NSxcbiAgICAgICAgc3BsaXRTdHJpbmdzOiB0cnVlLFxuICAgICAgICBzcGxpdFN0cmluZ3NDaHVua0xlbmd0aDogMTAsXG4gICAgICAgIHRyYW5zZm9ybU9iamVjdEtleXM6IHRydWUsXG4gICAgICAgIHVuaWNvZGVFc2NhcGVTZXF1ZW5jZTogZmFsc2UsXG4gICAgICB9KSxcbiAgXS5maWx0ZXIoQm9vbGVhbiksXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbn0pKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFMsU0FBUyxvQkFBb0I7QUFDdlUsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixTQUFTLHVCQUF1QjtBQUVoQyxTQUFTLHlCQUF5QjtBQUxsQyxJQUFNLG1DQUFtQztBQVF6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sU0FBUyxpQkFBaUIsZ0JBQWdCO0FBQUEsSUFDMUMsU0FBUyxnQkFDUCxrQkFBa0I7QUFBQSxNQUNoQixTQUFTO0FBQUEsTUFDVCx1QkFBdUI7QUFBQSxNQUN2QixnQ0FBZ0M7QUFBQSxNQUNoQyxtQkFBbUI7QUFBQSxNQUNuQiw0QkFBNEI7QUFBQSxNQUM1QixpQkFBaUI7QUFBQSxNQUNqQix5QkFBeUI7QUFBQSxNQUN6QixzQkFBc0I7QUFBQSxNQUN0QiwwQkFBMEI7QUFBQSxNQUMxQixlQUFlO0FBQUEsTUFDZixlQUFlO0FBQUEsTUFDZixhQUFhO0FBQUEsTUFDYiwyQkFBMkI7QUFBQSxNQUMzQixxQkFBcUIsQ0FBQyxRQUFRO0FBQUEsTUFDOUIsdUJBQXVCO0FBQUEsTUFDdkIsbUJBQW1CO0FBQUEsTUFDbkIsb0JBQW9CO0FBQUEsTUFDcEIsMEJBQTBCO0FBQUEsTUFDMUIsaUNBQWlDO0FBQUEsTUFDakMseUJBQXlCO0FBQUEsTUFDekIsc0JBQXNCO0FBQUEsTUFDdEIsY0FBYztBQUFBLE1BQ2QseUJBQXlCO0FBQUEsTUFDekIscUJBQXFCO0FBQUEsTUFDckIsdUJBQXVCO0FBQUEsSUFDekIsQ0FBQztBQUFBLEVBQ0wsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUNoQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
