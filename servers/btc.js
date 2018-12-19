const { convert, usd, satoshi } = require('@kava-labs/crypto-rate-utils')

module.exports = rateApi => {
  const maxPacketAmount = convert(usd(0.2), satoshi(), rateApi)

  return {
    relation: 'child',
    plugin: 'ilp-plugin-lightning',
    assetCode: 'BTC',
    assetScale: 8,
    options: {
      role: 'server',
      lndIdentityPubkey: process.env.LIGHTNING_LND_IDENTITY_PUBKEY,
      lndHost: process.env.LIGHTNING_LND_HOST,
      lnd: {
        tlsCert: process.env.LIGHTNING_TLS_CERT_PATH,
        macaroon: process.env.LIGHTNING_MACAROON_PATH,
        lndHost: process.env.LIGHTNING_LND_HOST
      },
      port: 7441,
      balance: {
        maximum: '0',
        settleTo: '0',
        settleThreshold: '0' // Don't pass 0 as number: falsy value won't get set (bug in plugin)
      },
      maxPacketAmount // In plugin (and not connector middleware) so F08s occur *before* T04s
    }
  }
}
