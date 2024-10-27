/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';

// Composables
import { createVuetify } from 'vuetify';
import i18n from '@/core/i18n';
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n';
import { useI18n } from 'vue-i18n';

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
   locale: {
      adapter: createVueI18nAdapter({ i18n, useI18n }),
      rtl: {
         // use rtl in hebrew
         he: true
      }
   },
   theme: {
      defaultTheme: 'light',
      themes: {
         light: {
            colors: {
               'on-surface': '#393939',
               primary100: '#EBF7FB',
               primary200: '#79C6E0',
               primary300: '#0089D7',
               primary400: '#0672A8',
               neutral50: '#F9FAFB',
               neutral100: '#ECF1F7',
               neutral200: '#EAECF0',
               neutral300: '#DEE2E6',
               neutral600: '#D0D5DD',
               neutral800: '#667085',
               swatch: '#393939',
               accent1: '#ECFDF3',
               accent2: '#027A48',
               accent3: '#FBF0F0',
               accent4: '#F73939',
               accent5: '#FFCB15',
               textPrimary: '#344054',
               secondary: '#5CBBF6',
               button: '#0089D7',
               textHint: '#667085'
            }
         }
      }
   }
});
