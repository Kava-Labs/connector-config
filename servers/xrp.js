const { convert, usd, xrpBase, drop } = require('@kava-labs/crypto-rate-utils')

module.exports = rateBackend => {
  const outgoingChannelAmount = convert(usd(10), drop(), rateBackend).toNumber()
  const minIncomingChannelAmount = convert(
    usd(0.5),
    drop(),
    rateBackend
  ).toNumber()
  const maxPacketAmount = convert(usd(0.2), xrpBase(), rateBackend)

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
      // Use plugin maxPacketAmount (and not connector middleware) so F08s occur *before* T04s
      maxPacketAmount,
      // Very asymmetric... you fund a channel for $0.50 in XRP, we'll open one to you for $10!
      outgoingChannelAmount,
      minIncomingChannelAmount
    }
  }
}
