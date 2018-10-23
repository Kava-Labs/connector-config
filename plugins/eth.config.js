const { convert, Unit } = require('ilp-plugin-ethereum/build/account')

module.exports = {
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
    // maxPacketAmount: convert('0.002', Unit.Eth, Unit.Gwei).toString(),
    outgoingChannelAmount: convert('0.05', Unit.Eth, Unit.Gwei).toString(),
    balance: {
      maximum: '0',
      settleTo: '0',
      settleThreshold: '0'
    }
  }
}
