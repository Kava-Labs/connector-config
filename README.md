# connector-config

> Configuration environment for running an `ilp-connector`

## Prerequisites

<details>
  <summary>Redis</summary>

  Install Redis using `brew` on Mac:
  ```shell
  brew install redis
  ```

  Start running the background service:
  ```shell
  brew services start redis
  ```

  The default configuration should work out of the box. If necessary, however, you can edit it here:
  ```shell
  sudo open /usr/local/etc/redis.conf
  ```

  To confirm it works, run:
  ```shell
  redis-cli ping
  ```

  If that command output `PONG`, you're in business!
</details>

## Install

```shell
git clone https://github.com/Kava-Labs/connector-config.git
cd connector-config
npm install
```

## Development

Start connector as a regular Node.js process:
```shell
npm run dev
```

**Debugging with inspect:**
* Auto-magically find an inspect port beginning from the default port `9229`, counting up
* Alternatively, manually assign a port to the `INSPECT` environment variable

**Adding ports to Chrome network targets:**
* Go to `chrome://inspect/#devices` in Google Chrome and click `Configure...`. Then, add ports counting up from `9229` like so:

<img src="https://i.imgur.com/SuPRgrM.png" width="600" />

## Production

Start connector as a long-running background process via PM2 daemon:
```shell
npm run start
# or
npm run restart
```

## Notes

- Logs will be in `~/.pm2/logs/ilp-connector-combined.log`
- Running `npm run restart` will run the `start` script and tail the logs
