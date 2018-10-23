
const path = require('path')

const ecosystem = {
	apps: [
		{
			cwd: __dirname,
			name: 'ilp-connector',
			node_args: ['-r', 'dotenv/config', '-r', 'envkey'],
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
	console.log(`ecosystem ->`, ecosystem)
}

module.exports = ecosystem
