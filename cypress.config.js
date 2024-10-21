const { defineConfig } = require('cypress')

module.exports = defineConfig({
  env: {
    loginBody: {
      usuario: 'admin',
      senha: 'password'
    }
  },
  e2e: {
    setupNodeEvents(on, config) {},
    supportFile: false,
    baseUrl: 'http://testeqa.pge.ce.gov.br'
  },
})
