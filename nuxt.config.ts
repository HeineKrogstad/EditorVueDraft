// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
          primary: {
            color: '{violet.800}',
            hoverColor: '{violet.700}',
            activeColor: '{violet.600}'
        },
      },
    }
  }
});

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 8000
  },
  css: [
    '~/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    '@pinia/nuxt',
    '@primevue/nuxt-module',
  ],

  routeRules: {
    '/api/**': { proxy: 'http://localhost:3000/**' }
  },

  primevue: {
    options: {
      theme: {
        preset: MyPreset,
        options: {
          cssLayer: {
              name: 'primevue',
              order: 'primevue, tailwind-base, tailwind-utilities'
          }
        }
      }
    }
  }
})
