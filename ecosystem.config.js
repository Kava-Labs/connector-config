
const dotenv = require('dotenv')
const envkey = require('envkey/loader')
const os = require('os')
const fs = require('fs')
const path = require('path')
const execa = require('execa')



const env = {}
Object.assign(env, readDotFile('.env')) // parse initial .env file vars and merge
let ENVKEY = process.env.ENVKEY || env.ENVKEY
if (ENVKEY) Object.assign(env, envkey.fetch(ENVKEY)); // fetch envkey vars and merge
Object.assign(env, readDotFile('.env.local')) // parse .env.local file vars and merge
delete process.env.ENVKEY; delete env.ENVKEY // dont expose ENVKEY
for (key in env) {
	if (process.env[key] != null) { // if the env var exists already,
		env[key] = process.env[key] // pre-existing env have seniority
	}
}
Object.assign(process.env, env, process.env) // apply env to process.env



const ecosystem = {
	apps: [
		{
			cwd: __dirname,
			name: 'ilp-connector',
			script: path.join(__dirname, 'run-connector.js'),
			node_args: [],
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
			node_args: [],
			args: ['--colors'],
			env: {
				DEBUG: '*,-koa*',
				PORT: '7770',
				ADMIN_API_PORT: '7769',
			},
		},
	],
}

let ports = Array.from(Array(os.cpus().length * ecosystem.apps.length), (v, i) => {
	return (process.env.INSPECT
		? parseInt(process.env.INSPECT)
		: process.debugPort
	) + i
})

ecosystem.apps.forEach((app, i) => {

	if (process.env.NODE_ENV != 'production') {
		let port = execa.shellSync(`get-port ${ports.join(' ')}`).stdout
		ports = ports.filter(v => v != port)
		app.node_args.push(`--inspect=${port}`)
	}

	app.env = Object.assign({}, {
		FORCE_COLOR: '1',
		DEBUG_COLORS: 'yes',
		DEBUG_SHOW_HIDDEN: 'enabled',
	}, app.env)

})

module.exports = ecosystem



function readDotFile(dotfile) {
	dotfile = path.join(process.cwd(), dotfile)
	if (!fs.existsSync(dotfile)) return {};
	return dotenv.parse(fs.readFileSync(dotfile))
}


