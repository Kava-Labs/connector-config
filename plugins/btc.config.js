const { convert, Unit } = require('ilp-plugin-lightning/build/account')

module.exports = {
  relation: 'child',
  plugin: 'ilp-plugin-lightning',
  assetCode: 'BTC',
  assetScale: 8,
  options: {
    role: 'server',
    lndIdentityPubkey: process.env.LND_PUBKEY,
    lndHost: process.env.LND_PEERHOST,
    lnd: {
      tlsCertPath: process.env.LND_TLSCERT,
      macaroonPath: process.env.LND_MACAROON,
      lndHost: process.env.LND_PEERHOST,
    },
    port: 7441,
    maxPacketAmount: convert(0.000005, Unit.BTC, Unit.Satoshi),
    balance: {
      maximum: '0',
      settleTo: '0',
      settleThreshold: '0'
    }
  }
}
