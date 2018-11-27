const { convert, usd, xrpBase } = require('@kava-labs/crypto-rate-utils')

module.exports = async rateApi => {
  const maxPacketAmount = (await convert(
    usd(0.1),
    xrpBase(),
    rateApi
  )).toString()
  const maximum = (await convert(usd(2), xrpBase(), rateApi)).toString()

  return {
    relation: 'peer',
    plugin: 'ilp-plugin-xrp-paychan',
    assetCode: 'XRP',
    assetScale: 9,
    maxPacketAmount,
    balance: {
      maximum,
      settleThreshold: '0',
      settleTo: '0'
    },
    options: {
      assetScale: 9,
      listener: {
        port: 7444,
        secret: process.env.XRP_STRATA_3_SECRET
      },
      xrpServer: process.env.XRP_SERVER,
      address: process.env.XRP_ADDRESS,
      secret: process.env.XRP_SECRET
    }
  }
}
