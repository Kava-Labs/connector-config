const { convert, usd, gwei } = require('@kava-labs/crypto-rate-utils')
const axios = require('axios')

const getGasPrice = async () => {
  const { data } = await axios.get(
    'https://ethgasstation.info/json/ethgasAPI.json'
  )

  return convert(gwei(data.fast / 10), wei())
}

module.exports = rateApi => {
  const outgoingChannelAmount = convert(usd(10), gwei(), rateApi)
  const maxPacketAmount = convert(usd(0.2), gwei(), rateApi)

  return {
    relation: 'child',
    plugin: 'ilp-plugin-ethereum',
    assetCode: 'ETH',
    assetScale: 9,
    options: {
      role: 'server',
      ethereumPrivateKey: process.env.ETHEREUM_PRIVATE_KEY,
      ethereumProvider: process.env.ETHEREUM_PROVIDER,
      getGasPrice: process.env.CONNECTOR_ENV === 'production' && getGasPrice,
      port: 7442,
      incomingChannelFee: 0,
      outgoingChannelAmount,
      balance: {
        maximum: '0',
        settleTo: '0',
        settleThreshold: '0' // Don't pass 0 as number: falsy value won't get set (bug in plugin)
      },
      maxPacketAmount // In plugin (and not connector middleware) so F08s occur *before* T04s
    }
  }
}
