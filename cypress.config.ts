import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,
  video: false,
  projectId: 'f6ssqp',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.ts')(on, config)
    },
    baseUrl: 'https://www.dolthub.com',
    specPattern:
      'cypress/integration/dolthub/productionTests/**/*.{js,jsx,ts,tsx}',
  },
})
