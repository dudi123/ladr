// Plugins
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// Utilities
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      vue({
         template: { transformAssetUrls }
      }),
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
      vuetify({
         autoImport: true,
         styles: {
            configFile: 'src/styles/settings.scss'
         }
      })
   ],
   define: { 'process.env': {} },
   resolve: {
      alias: {
         '@': fileURLToPath(new URL('./src', import.meta.url))
      },
      extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
   },
   server: {
      port: 3000,
      proxy: {
         // To avoid CORS we must define a proxy
         // the following proxy will redirect all calls of /api to the defined target
         // you have full control  on the rewrite url
         '/api': {
            target: 'https://serverhost:serverport',
            changeOrigin: true,
            secure: false, // you can change to true but you'll need to define certificate
            rewrite: (path) => path.replace(/^\/api/, '')
         }
      }
   }
});
