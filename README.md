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

**Adding ports to Chrome network targets:**
* Goto `chrome://inspect/#devices` in your Google Chrome browser and click `Configure...` then add ports counting up from `9229` like so:
![Discover network targets](https://i.imgur.com/SuPRgrM.png)

## Production
Start connector as a long-running background process via PM2 daemon:
```shell
npm run start
# OR
npm run restart
```

## Notes
> * Logs will be in `~/.pm2/logs/ilp-connector-combined.log`
> * Running `restart` will run `start` and tail the logs


