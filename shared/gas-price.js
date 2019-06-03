const BigNumber = require('bignumber.js')
const axios = require('axios')

const gweiToWei = num => new BigNumber(num).shiftedBy(9)

module.exports = {
  async getGasPrice() {
    const { data } = await axios.get(
      'https://ethgasstation.info/json/ethgasAPI.json'
    )

    return gweiToWei(data.fast / 10)
  }
}
