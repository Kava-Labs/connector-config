const os = require('os')
const path = require('path')
const execa = require('execa')
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
      args: ['--colors'],
      env: {
        ...process.env,
        ...debugEnv
      },
      log: '~/.pm2/logs/ilp-connector-combined.log'
    }
    // {
    //   cwd: __dirname,
    //   name: 'moneyd-gui',
    //   script: path.join(__dirname, 'node_modules/moneyd-gui'),
    //   node_args: [],
    //   args: ['--colors'],
    //   env: {
    //     PORT: '7770',
    //     ADMIN_API_PORT: '7769',
    //     ...debugEnv
    //   }
    // }
  ]
}

let ports = [...Array(os.cpus().length * ecosystem.apps.length)].map((v, i) => {
  return (
    (process.env.INSPECT ? parseInt(process.env.INSPECT) : process.debugPort) +
    i
  )
})

ecosystem.apps.forEach(app => {
  if (process.env.NODE_ENV !== 'production') {
    let port = execa.shellSync(`get-port ${ports.join(' ')}`).stdout
    ports = ports.filter(v => v != port)
    app.node_args.push(`--inspect-brk=${port}`)
  }
})

module.exports = ecosystem
