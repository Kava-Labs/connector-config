const { getGasPrice } = require('../shared/gas-price')

const gweiDai = {
  symbol: 'DAI',
  exchangeScale: 18,
  accountScale: 9,
  scale: 9
}

module.exports = convertUsdTo => {
  const outgoingChannelAmount = convertUsdTo(20, gweiDai)
  const minIncomingChannelAmount = convertUsdTo(0.5, gweiDai)
  const maxPacketAmount = convertUsdTo(0.2, gweiDai)

  return {
    relation: 'child',
    plugin: 'ilp-plugin-ethereum',
    assetCode: 'DAI',
    assetScale: 9,
    options: {
      role: 'server',
      port: 7444,
      ethereumPrivateKey: process.env.DAI_PRIVATE_KEY,
      ethereumProvider: process.env.ETHEREUM_PROVIDER,
      getGasPrice: process.env.CONNECTOR_ENV === 'production' && getGasPrice,
      outgoingChannelAmount,
      minIncomingChannelAmount,
      // In plugin (and not connector middleware) so F08s occur *before* T04s
      maxPacketAmount,
      tokenAddress: process.env.DAI_TOKEN_ADDRESS
    }
  }
}
