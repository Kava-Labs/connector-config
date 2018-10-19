const util = require('util')
Object.assign(util.inspect.defaultOptions, { depth: 4, sorted: true, showHidden: false, showProxy: false, compact: false, breakLength: Infinity, maxArrayLength: Infinity, colors: true })
Object.assign(util.inspect.styles, { string: 'green', regexp: 'green', date: 'green', number: 'magenta', boolean: 'blue', undefined: 'red', null: 'red', symbol: 'cyan', special: 'cyan' })

const path = require('path')
const ecosystem = {
	apps: [
		{
			cwd: __dirname,
			name: 'ilp-connector',
			node_args: ['-r', 'envkey'],
			script: path.join(__dirname, 'run-connector.js'),
			args: ['--colors'],
			env: {
				DEBUG: '*',
			},
		},
		{
			cwd: __dirname,
			name: 'moneyd-gui',
			script: path.join(__dirname, 'node_modules/moneyd-gui'),
			args: ['--colors'],
			env: {
				DEBUG: '*,-koa*',
				PORT: '7770',
				ADMIN_API_PORT: '7769',
			},
		},
	]
}

if (process.env.NODE_ENV == 'development') {
	console.log('pm2 ecosystem ->', util.inspect(ecosystem))
}

module.exports = ecosystem
