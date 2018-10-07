const BigNumber = require('bignumber.js')
const maximum = new BigNumber(10).shiftedBy(9).toString()
const settleThreshold = new BigNumber(maximum).dividedBy(2).toString()
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
    peerAddress: 'rNJ25qzwhqkrQY8WmhwtoGotPDgtqGmqPL',
    assetScale: 9,
    listener: {
      port: 7444,
      secret: process.env.STRATA_3_SECRET
    },
    xrpServer: 'wss://s1.ripple.com',
    address: process.env.XRP_ADDRESS,
    secret: process.env.XRP_SECRET,
  }
}
