const BigNumber = require('bignumber.js')
const maximum = new BigNumber(1).shiftedBy(10).toString()
const settleThreshold = new BigNumber(-1).shiftedBy(6).toString()
const maxPacketAmount = new BigNumber('0.1').shiftedBy(9).toString()

module.exports = {
  relation: 'peer',
  plugin: 'ilp-plugin-xrp-paychan',
  assetCode: 'XRP',
  assetScale: 9,
  maxPacketAmount,
  balance: {
    maximum,
    settleThreshold,
    settleTo: '0',
  },
  options: {
    assetScale: 9,
    listener: {
      port: 7444,
      secret: process.env.XRP_STRATA_3_SECRET
    },
    xrpServer: process.env.XRP_SERVER,
    address: process.env.XRP_ADDRESS,
    secret: process.env.XRP_SECRET,
  }
}