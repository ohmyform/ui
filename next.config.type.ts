export interface NextConfigType {
  publicRuntimeConfig: {
    endpoint: string
    spa?: boolean
    mainBackground?: string
  }
  serverRuntimeConfig: {
    endpoint: string
  }
}
