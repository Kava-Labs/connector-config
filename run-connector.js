const { createApp } = require('@kava-labs/ilp-connector')
const { connectCoinCap } = require('@kava-labs/crypto-rate-utils')
const { parse, resolve } = require('path')
const chokidar = require('chokidar')

async function run() {
  const rateBackend = await connectCoinCap()

  const config = {
    env: process.env.CONNECTOR_ENV,
    adminApi: true,
    adminApiPort: 7769,
    ilpAddress: process.env.ILP_ADDRESS,
    spread: 0,
    backend: '@kava-labs/ilp-backend-crypto',
    store: '@kava-labs/ilp-store-redis',
    storeConfig: {
      password: process.env.REDIS_PASS,
      prefix: 'connector',
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    },
    accountProviders: {
      servers: {
        type: 'plugin'
      }
    },
    accounts: {}
  }

  const { listen, addPlugin, removePlugin } = createApp(config)

  // Start the connector
  await listen()

  // Setup a watcher for the file to hot swap the plugin if the config changes
  const paths = ['./servers/**/*.js']
  if (process.env.ILP_ADDRESS.startsWith('g')) {
    paths.push('./peers/mainnet/*.js')
  }
  if (process.env.ILP_ADDRESS.startsWith('test')) {
    paths.push('./peers/testnet/*.js')
  }

  const watcher = chokidar.watch(paths, {
    awaitWriteFinish: true
  })

  const add = async path => {
    const { name: accountId, ext } = parse(path)
    if (ext === '.js') {
      const createConfig = require(resolve(path))
      const accountConfig = createConfig(rateBackend)

      await addPlugin(accountId, accountConfig)
    }
  }

  const remove = async path => {
    const { name: accountId } = parse(path)
    await removePlugin(accountId)
  }

  watcher.on('add', add)
  watcher.on('change', async path => {
    await remove(path)
    await add(path)
  })
  watcher.on('unlink', remove)
}

run()
