
const config = {
	env: process.env.CONNECTOR_ENV,
	adminApi: true,
	adminApiPort: 7769,
	ilpAddress: process.env.ILP_ADDRESS,
	backend: 'ecb-plus-coinmarketcap',
	spread: 0,
	store: 'ilp-store-redis',
	storeConfig: {
		password: process.env.REDIS_PASS,
		prefix: 'connector',
		host: '127.0.0.1',
		port: 6379
	},
	accounts: {
		// Peers
		'strata4-xrp': require('./plugins/strata4-xrp.config.js'),
		// Servers
		eth: require('./plugins/eth.config.js'),
		xrp: require('./plugins/xrp.config.js'),
		btc: require('./plugins/btc.config.js'),
		// Moneyd
		local: require('./plugins/mini-accounts.config.js')
	}
}

if (process.env.NODE_ENV == 'development') {
	console.log(`config ->`, config)
}

const { createApp } = require('ilp-connector')
createApp(config).listen()
