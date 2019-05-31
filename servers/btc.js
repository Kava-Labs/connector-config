const sat = {
  symbol: 'BTC',
  exchangeScale: 8,
  accountScale: 0,
  scale: 0
}

module.exports = convertUsdTo => ({
  relation: 'child',
  plugin: 'ilp-plugin-lightning',
  assetCode: 'BTC',
  assetScale: 8,
  options: {
    role: 'server',
    port: 7441,
    lnd: {
      tlsCert: process.env.LIGHTNING_TLS_CERT_PATH,
      macaroon: process.env.LIGHTNING_MACAROON_PATH,
      hostname: process.env.LIGHTNING_LND_HOST,
      grpcPort: parseInt(process.env.LIGHTNING_GRPC_PORT)
    },
    // In plugin (and not connector middleware) so F08s occur *before* T04s
    maxPacketAmount: convertUsdTo(0.2, sat)
  }
})
