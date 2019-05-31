const nanoXrp = {
  symbol: 'XRP',
  exchangeScale: 6,
  accountScale: -3,
  scale: -3
}

module.exports = convertUsdTo => {
  const maxPacketAmount = convertUsdTo(0.1, nanoXrp).toString()
  const maximum = convertUsdTo(2, nanoXrp).toString()

  return {
    relation: 'peer',
    plugin: 'ilp-plugin-xrp-paychan',
    assetCode: 'XRP',
    assetScale: 9,
    maxPacketAmount,
    balance: {
      maximum,
      settleThreshold: '0',
      settleTo: '0'
    },
    options: {
      listener: {
        port: 7541,
        secret: process.env.NIKHIL_SECRET
      },
      xrpServer: process.env.XRP_SERVER,
      secret: process.env.XRP_SECRET,
      peerAddress: process.env.NIKHIL_PEER_XRP_ADDRESS
    }
  }
}
