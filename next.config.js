const withImages = require('next-images')
const p = require('./package.json')

const version = p.version;

module.exports = withImages({
  poweredByHeader: true,
  future: {
    webpack5: true,
  },
  publicRuntimeConfig: {
    endpoint: process.env.ENDPOINT || '/graphql',
    spa: !!process.env.SPA || false,
    mainBackground: process.env.MAIN_BACKGROUND || '#8FA2A6'
  },
  serverRuntimeConfig: {
    endpoint: process.env.SERVER_ENDPOINT || process.env.ENDPOINT || '/graphql',
  },
  env: {
    version,
  }
})
