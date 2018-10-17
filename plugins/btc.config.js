const { convert, Unit } = require('ilp-plugin-lightning/build/account')

module.exports = {
  relation: 'child',
  plugin: 'ilp-plugin-lightning',
  assetCode: 'BTC',
  assetScale: 8,
  options: {
    role: 'server',
    lndIdentityPubkey: process.env.LIGHTNING_LND_IDENTITY_PUBKEY,
    lndHost: process.env.LIGHTNING_LND_HOST,
    lnd: {
      tlsCertPath: process.env.LIGHTNING_TLS_CERT_PATH,
      macaroonPath: process.env.LIGHTNING_MACAROON_PATH,
      lndHost: process.env.LIGHTNING_LND_HOST,
    },
    port: 7441,
    maxPacketAmount: convert(0.00001, Unit.BTC, Unit.Satoshi),
    balance: {
      maximum: '0',
      settleTo: '0',
      settleThreshold: '0'
    }
  }
}
