const BigNumber = require('bignumber.js')
// const maximum = new BigNumber(10).shiftedBy(9).toString()
const maximum = new BigNumber(9).shiftedBy(9).toString()
// const settleThreshold = new BigNumber(maximum).dividedBy(2).toString()
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
    // peerAddress: 'rfES1negveYfX9TpV8tapBvye8a52pXBHG',
    assetScale: 9,
    listener: {
      port: 7444,
      secret: process.env.XRP_STRATA_3_SECRET
    },
    xrpServer: 'wss://s.altnet.rippletest.net:51233',
    address: process.env.XRP_ADDRESS,
    secret: process.env.XRP_SECRET,
  }
}