const withImages = require('next-images')
const module = require('./package.json')

const version = module.version;

module.exports = withImages({
  publicRuntimeConfig: {
    endpoint: process.env.API_HOST || '/graphql',
    version,
  }
})
