const dotenv = require('dotenv')
const { fetch: fetchEnvkeys } = require('envkey/loader')
const os = require('os')
const fs = require('fs')
const path = require('path')
const execa = require('execa')

const readDotFile = dotfile => {
  const dotfilePath = path.join(process.cwd(), dotfile)
  if (fs.existsSync(dotfilePath)) {
    return dotenv.parse(fs.readFileSync(dotfilePath))
  }
}

const getEnvkeys = envkey => envkey && fetchEnvkeys(envkey)

const env = {
  ...readDotFile('.env'),
  ...readDotFile('.env.local')
}

process.env = {
  ...env,
  ...process.env,
  ...getEnvkeys(process.env.ENVKEY || env.ENVKEY)
}

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

ecosystem.apps.forEach((app, i) => {
  if (process.env.NODE_ENV !== 'production') {
    let port = execa.shellSync(`get-port ${ports.join(' ')}`).stdout
    ports = ports.filter(v => v != port)
    app.node_args.push(`--inspect-brk=${port}`)
  }
})

module.exports = ecosystem
