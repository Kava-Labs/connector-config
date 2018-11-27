const { createApp } = require('ilp-connector')
const { connectCoinCap } = require('@kava-labs/crypto-rate-utils')
const chokidar = require('chokidar')

async function run() {
  const config = {
    env: process.env.CONNECTOR_ENV,
    adminApi: true,
    adminApiPort: 7769,
    ilpAddress: process.env.ILP_ADDRESS,
    backend: '@kava-labs/ilp-backend-crypto',
    spread: 0,
    store: 'ilp-store-redis',
    storeConfig: {
      password: process.env.REDIS_PASS,
      prefix: 'connector',
      host: '127.0.0.1',
      port: 6379
    },
    accounts: {}
  }

  const rateApi = await connectCoinCap()

  const { listen, addPlugin, removePlugin } = createApp(config)

  const setupWatcher = async accountId => {
    const path = `./plugins/${accountId}.config.js`

    // Setup a watcher for the file to hot swap the plugin if the config changes
    const watcher = chokidar.watch(path, {
      ignoreInitial: true
    })

    const load = async () => {
      // Create the plugin options to pass to the connector
      const createConfig = require(path)
      const accountConfig = await createConfig(rateApi)

      await addPlugin(accountId, accountConfig)
    }

    const reload = async () => {
      await removePlugin(accountId)
      await load()
    }

    watcher.on('ready', load)
    watcher.on('change', reload)
  }

  // Start the conenctor
  await listen()

  const accountIds = [
    // Add server plugins
    'btc',
    'eth',
    'xrp',
    // Add peering plugins (unless running locally)
    ...(process.env.ILP_ADDRESS.startsWith('local') ? [] : ['strata4-xrp']),
    // Add mini-accounts (required for moneyd)
    'local'
  ]

  // Load all the plugins
  await Promise.all(accountIds.map(a => setupWatcher(a)))
}

run()
