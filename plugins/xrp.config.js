const BigNumber = require('bignumber.js')
const maxPacketAmount = new BigNumber('0.1').shiftedBy(9).toString()

module.exports = {
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
    maxPacketAmount
  },
  maxPacketAmount,
  balance: {
    maximum: '0',
    settleTo: '0',
    settleThreshold: '0'
  }
}
