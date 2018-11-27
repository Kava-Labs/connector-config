const { convert, usd, satoshi } = require('@kava-labs/crypto-rate-utils')

module.exports = async rateApi => {
  const maxPacketAmount = (await convert(
    usd(0.1),
    satoshi(),
    rateApi
  )).toString()

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
        tlsCertInput: process.env.LIGHTNING_TLS_CERT_PATH,
        macaroonInput: process.env.LIGHTNING_MACAROON_PATH,
        lndHost: process.env.LIGHTNING_LND_HOST
      },
      port: 7441,
      balance: {
        maximum: '0',
        settleTo: '0',
        settleThreshold: '0'
      }
    },
    maxPacketAmount
  }
}
