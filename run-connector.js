const util = require('util')
// Object.assign(util.inspect.defaultOptions, { depth: 4, sorted: true, showHidden: false, showProxy: false, compact: false, breakLength: Infinity, maxArrayLength: Infinity, colors: true })
// Object.assign(util.inspect.styles, { string: 'green', regexp: 'green', date: 'green', number: 'magenta', boolean: 'blue', undefined: 'red', null: 'red', symbol: 'cyan', special: 'cyan' })

const config = {
	env: process.env.CONNECTOR_ENV,
	adminApi: true,
	adminApiPort: 7769,
	ilpAddress: process.env.ILP_ADDRESS,
	backend: 'ecb-plus-coinmarketcap',
	spread: 0,
	store: 'ilp-store-redis',
	storeConfig: {
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
	console.log('createApp(config) ->', util.inspect(config))
}

const { createApp } = require('ilp-connector')
createApp(config).listen()
