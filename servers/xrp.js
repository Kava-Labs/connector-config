const { convert, usd, xrpBase, drop } = require('@kava-labs/crypto-rate-utils')

module.exports = rateApi => {
  const outgoingChannelAmount = convert(usd(10), drop(), rateApi).toNumber()
  const maxPacketAmount = convert(usd(0.2), xrpBase(), rateApi)

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
      secret: process.env.XRP_SECRET,
      // Max credit defaults to 0, so it's unnecesssary
      maxPacketAmount /* In plugin (and not connector middleware) so F08s occur *before* T04s */,
      outgoingChannelAmount
    }
  }
}
