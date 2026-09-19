import { defineConfig, loadEnv } from 'vite';
// React's automatic JSX runtime is sufficient; no heavy UI/animation framework.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    esbuild: { jsx: 'automatic' },
    server: { host: '0.0.0.0', allowedHosts: ['terminal.local'], port: 5173, strictPort: false, proxy: {
      '/api': { target: env.API_PROXY_TARGET || 'http://127.0.0.1:8000', changeOrigin: true }
    } },
    build: { target: 'es2020', sourcemap: false },
    ssr: { noExternal: ['react-router-dom', 'react-router', '@remix-run/router'] }
  };
});
