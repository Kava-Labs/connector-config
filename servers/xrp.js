const { convert, usd, drop } = require('@kava-labs/crypto-rate-utils')

module.exports = rateBackend => {
  const outgoingChannelAmount = convert(usd(10), drop(), rateBackend)
  const minIncomingChannelAmount = convert(usd(0.5), drop(), rateBackend)
  const maxPacketAmount = convert(usd(0.2), drop(), rateBackend)

  return {
    relation: 'child',
    plugin: '@kava-labs/ilp-plugin-xrp-paychan',
    assetCode: 'XRP',
    assetScale: 6,
    options: {
      role: 'server',
      port: 7443,
      xrpSecret: process.env.XRP_SECRET,
      xrpServer: process.env.XRP_SERVER,
      // Very asymmetric... you fund a channel for $0.50 in XRP, we'll open one to you for $10!
      outgoingChannelAmount,
      minIncomingChannelAmount,
      // Use plugin maxPacketAmount (and not connector middleware) so F08s occur *before* T04s
      maxPacketAmount
    }
  }
}
