// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
        50: '{violet.50}',
        100: '{violet.100}',
        200: '{violet.200}',
        300: '{violet.300}',
        400: '{violet.400}',
        500: '{violet.500}',
        600: '{violet.600}',
        700: '{violet.700}',
        800: '{violet.800}',
        900: '{violet.900}',
        950: '{violet.950}'
    },
    colorScheme: {
      light: {
          primary: {
            color: '{violet.800}',
            hoverColor: '{violet.700}',
        },
      },
    }
  }
});

export default defineNuxtConfig({
  devtools: { enabled: true },
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
  primevue: {
    options: {
      theme: {
          preset: MyPreset
      }
    }
  }
})