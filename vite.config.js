import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  server: {
    allowedHosts: ['proven-alliance-learners-manuals.trycloudflare.com']
  }
});
