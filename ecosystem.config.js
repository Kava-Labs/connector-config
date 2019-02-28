const path = require('path')
require('envkey')

const debugEnv = {
  DEBUG: 'ilp*,switch*,connector*',
  FORCE_COLOR: '1',
  DEBUG_COLORS: 'yes',
  DEBUG_SHOW_HIDDEN: 'enabled'
}

const ecosystem = {
  apps: [
    {
      cwd: __dirname,
      name: 'ilp-connector',
      script: path.join(__dirname, 'run-connector.js'),
      node_args: [],
      env: {
        ...process.env,
        ...debugEnv
      },
      log: '~/.pm2/logs/ilp-connector-combined.log'
    }
  ]
}

if (process.env.NODE_ENV !== 'production') {
  ecosystem.apps[0].node_args.push('--inspect-brk')
}

module.exports = ecosystem
