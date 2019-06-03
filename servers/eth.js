const { getGasPrice } = require('../shared/gas-price')

const gweiEth = {
  symbol: 'ETH',
  exchangeScale: 18,
  accountScale: 9,
  scale: 9
}

module.exports = convertUsdTo => {
  const outgoingChannelAmount = convertUsdTo(20, gweiEth)
  const maxPacketAmount = convertUsdTo(0.2, gweiEth)

  return {
    relation: 'child',
    plugin: 'ilp-plugin-ethereum',
    assetCode: 'ETH',
    assetScale: 9,
    options: {
      role: 'server',
      port: 7442,
      ethereumPrivateKey: process.env.ETHEREUM_PRIVATE_KEY,
      ethereumProvider: process.env.ETHEREUM_PROVIDER,
      getGasPrice: process.env.CONNECTOR_ENV === 'production' && getGasPrice,
      outgoingChannelAmount,
      minIncomingChannelAmount: 0,
      // In plugin (and not connector middleware) so F08s occur *before* T04s
      maxPacketAmount
    }
  }
}
