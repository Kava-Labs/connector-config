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
```
sudo open /usr/local/etc/redis.conf
```
> The default configuration works fine out of the box

Test if it workes:
```
redis-cli ping
```

</p></details>



## Install
```shell
git clone https://github.com/Kava-Labs/connector-config.git
npm install
```

