
const dotenv = require('dotenv')
const envkey = require('envkey/loader')
const fs = require('fs')
const path = require('path')



const env = {}
Object.assign(env, readDotFile('.env')) // parse initial .env file vars and merge
let ENVKEY = process.env.ENVKEY || env.ENVKEY
if (ENVKEY) Object.assign(env, envkey.fetch(ENVKEY)); // fetch envkey vars and merge
Object.assign(env, readDotFile('.env.local')) // parse .env.local file vars and merge
delete env.ENVKEY // dont expose actual ENVKEY to pm2 apps



const ecosystem = {
	apps: [
		{
			cwd: __dirname,
			name: 'ilp-connector',
			script: path.join(__dirname, 'run-connector.js'),
			args: ['--colors'],
			env: Object.assign({}, env, { // empty `{}` so `env` is not mutated
				DEBUG: '*',
			}),
			log: '~/.pm2/logs/ilp-connector-combined.log',
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

ecosystem.apps.forEach(app => app.env = Object.assign({}, {
	FORCE_COLOR: '1',
	DEBUG_COLORS: 'yes',
	DEBUG_SHOW_HIDDEN: 'enabled',
}, app.env))

module.exports = ecosystem



function readDotFile(dotfile) {
	dotfile = path.join(process.cwd(), dotfile)
	if (!fs.existsSync(dotfile)) return {};
	return dotenv.parse(fs.readFileSync(dotfile))
}


