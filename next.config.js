const withImages = require('next-images')
const p = require('./package.json')

const version = p.version;

module.exports = withImages({
  poweredByHeader: false,
  publicRuntimeConfig: {
    endpoint: process.env.API_HOST || '/graphql',
    spa: !!process.env.SPA || false,
  },
  env: {
    version,
  }
})
