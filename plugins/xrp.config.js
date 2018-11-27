const { convert, usd, xrpBase } = require('crypto-rate-utils')

module.exports = async rateApi => {
  const maxPacketAmount = (await convert(
    usd(0.1),
    xrpBase(),
    rateApi
  )).toString()

  return {
    relation: 'child',
    plugin: 'ilp-plugin-xrp-asym-server',
    assetCode: 'XRP',
    assetScale: 9,
    options: {
      assetScale: 9,
      port: 7443,
      xrpServer: process.env.XRP_SERVER,
      address: process.env.XRP_ADDRESS,
      secret: process.env.XRP_SECRET
    },
    maxPacketAmount
  }
}
