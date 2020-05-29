const withImages = require('next-images')
const p = require('./package.json')

const version = p.version;

module.exports = withImages({

  publicRuntimeConfig: {
    endpoint: process.env.API_HOST || '/graphql',
    version,
  }
})
