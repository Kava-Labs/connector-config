const path = require('path')

module.exports = {
  apps: [{
    name: 'ilp-connector',
    env: {
      DEBUG: 'ilp*'
    },
    node_args: ['--inspect'],
    script: path.resolve(__dirname, 'run-connector.js'),
  }]
}
