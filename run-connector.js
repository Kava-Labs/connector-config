const { createApp } = require('ilp-connector')

const connector = createApp({
  env: 'production',
  adminApi: true,
  adminApiPort: 7769,
  ilpAddress: 'g.kava',
  backend: 'ilp-backend-coinmarketcap',
  spread: 0,
  store: 'ilp-store-redis',
  storeConfig: {
    prefix: 'connector',
    host: '127.0.0.1',
    port: 6379
  },
  accounts: {
    // Peers
    'strata3-xrp': require('./plugins/strata3-xrp.config.js'),
    // Servers
    eth: require('./plugins/eth.config.js'),
    xrp: require('./plugins/xrp.config.js'),
    // Moneyd
    local: require('./plugins/mini-accounts.config.js')
  }
})

connector.listen()
