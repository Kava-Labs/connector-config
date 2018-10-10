const { convert, Unit } = require('ilp-plugin-ethereum/build/account')

module.exports = {
  relation: 'child',
  plugin: 'ilp-plugin-ethereum',
  assetCode: 'ETH',
  assetScale: 9,
  options: {
    role: 'server',
    ethereumPrivateKey: process.env.KOVAN_PRIVATE,
    ethereumProvider: 'https://mainnet.infura.io/bXIbx0x6ofEuDANTSeKI',
    port: 7442,
    incomingChannelFee: 0,
    maxPacketAmount: convert('0.0002', Unit.Eth, Unit.Gwei).toString(),
    outgoingChannelAmount: convert('0.02', Unit.Eth, Unit.Gwei).toString(),
    balance: {
      maximum: '0',
      settleTo: '0',
      settleThreshold: '0'
    }
  }
}
