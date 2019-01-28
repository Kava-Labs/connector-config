const { convert, usd, satoshi } = require('@kava-labs/crypto-rate-utils')

module.exports = rateApi => ({
  relation: 'child',
  plugin: 'ilp-plugin-lightning',
  assetCode: 'BTC',
  assetScale: 8,
  options: {
    role: 'server',
    lnd: {
      tlsCert: process.env.LIGHTNING_TLS_CERT_PATH,
      macaroon: process.env.LIGHTNING_MACAROON_PATH,
      hostname: process.env.LIGHTNING_LND_HOST,
      grpcPort: parseInt(process.env.LIGHTNING_GRPC_PORT)
    },
    port: 7441,
    balance: {
      maximum: 0,
      settleTo: 0,
      settleThreshold: 0
    },
    // In plugin (and not connector middleware) so F08s occur *before* T04s
    maxPacketAmount: convert(usd(0.2), satoshi(), rateApi)
  }
})
