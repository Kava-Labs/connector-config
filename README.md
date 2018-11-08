# connector-config
> Configuration environment for running an `ilp-connector`



## Prerequisites
<details><summary>Redis</summary><p>

Install Redis using brew:
```shell
brew install redis
```

Start background running service:
```shell
brew services start redis
```

Edit configuration:
```shell
sudo open /usr/local/etc/redis.conf
```
> The default configuration works fine out of the box

Test if it workes:
```shell
redis-cli ping
```

</p></details>



## Install
```shell
git clone https://github.com/Kava-Labs/connector-config.git
npm install
```

## Development
Start connector as a regular node.js process:
```shell
npm run dev
```
**Debugging with inspect:**
* Automagically find an inspect port counting up, starting from the default port `9229`
* Or you can manually assign a port to the `INSPECT` environment variable

## Production
Start connector as a long-running background process via PM2 daemon:
```shell
npm run start
# OR
npm run restart
```
> * PM2 daemon starts connector as a background process
> * Running `restart` will run `start` and tail the logs

## Notes
> * Logs will be in `~/.pm2/logs/ilp-connector-combined.log`


