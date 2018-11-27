const { convert, usd, gwei } = require('@kava-labs/crypto-rate-utils')

module.exports = async rateApi => {
  const outgoingChannelAmount = await convert(usd(10), gwei(), rateApi)
  const maxPacketAmount = (await convert(usd(0.1), gwei(), rateApi)).toString()

  return {
    relation: 'child',
    plugin: 'ilp-plugin-ethereum',
    assetCode: 'ETH',
    assetScale: 9,
    options: {
      role: 'server',
      ethereumPrivateKey: process.env.ETHEREUM_PRIVATE_KEY,
      ethereumProvider: process.env.ETHEREUM_PROVIDER,
      port: 7442,
      incomingChannelFee: 0,
      outgoingChannelAmount,
      balance: {
        maximum: '0',
        settleTo: '0',
        settleThreshold: '0'
      }
    },
    maxPacketAmount
  }
}
