//

const path = require('path')
const { convert, Unit } = require('./ilp-connector/node_modules/ilp-plugin-ethereum/build/account')
const BigNumber = require('./ilp-connector/node_modules/bignumber.js')

module.exports = {
        apps: [{
                name: 'ilp-connector',
                // cwd: __dirname,
                cwd: path.resolve(__dirname, 'ilp-connector'),
                script: path.resolve(__dirname, 'ilp-connector/src/index.js'),
                env: {
                        DEBUG: 'ilp*,connector*',
                        CONNECTOR_ENV: 'production',
                        CONNECTOR_ADMIN_API: true,
                        CONNECTOR_ADMIN_API_PORT: 7769,
                        CONNECTOR_ILP_ADDRESS: 'g.kava-test',
                        CONNECTOR_BACKEND: 'one-to-one',
                        CONNECTOR_SPREAD: '0.05',
                        CONNECTOR_STORE: 'ilp-store-redis',
                        CONNECTOR_STORE_CONFIG: JSON.stringify({
                                prefix: 'connector',
                                host: '127.0.0.1',
                                port: 6379,
                        }),
                        CONNECTOR_ACCOUNTS: JSON.stringify({

                                strata: {
                                        relation: 'peer',
                                        plugin: 'ilp-plugin-xrp-paychan',
                                        assetCode: 'XRP',
                                        assetScale: 9,
                                        maxPacketAmount: '1000000',
                                        balance: {
                                                maximum: '10000000000',
                                                settleThreshold: '-500000',
                                                settleTo: '0',
                                        },
                                        options: {
                                                peerAddress: 'rNJ25qzwhqkrQY8WmhwtoGotPDgtqGmqPL',
                                                currencyScale: 9,
                                                listener: {
                                                        port: 7444,
                                                        secret: 'XDXY4LadpfaqO4xnqD7nH165tAtz4qALmnB639els',
                                                },
                                                xrpServer: 'wss://s1.ripple.com',
                                                rippledServer: 'wss://s2.ripple.com',
                                                address: process.env.XRP_ADDRESS,
                                                secret: process.env.XRP_SECRET,
                                        },
                                },

                                ilsp: {
                                        relation: 'child',
                                        plugin: 'ilp-plugin-xrp-asym-server',
                                        assetCode: 'XRP',
                                        assetScale: 9,
                                        options: {
                                                currencyScale: 9,
                                                port: 7443,
                                                xrpServer: 'wss://s1.ripple.com',
                                                rippledServer: 'wss://s2.ripple.com',
                                                address: process.env.XRP_ADDRESS,
                                                secret: process.env.XRP_SECRET,
                                        },
                                },

                                miniaccts: {
                                        relation: 'child',
                                        plugin: 'ilp-plugin-mini-accounts',
                                        assetCode: 'XRP',
                                        assetScale: 9,
                                        options: {
                                                port: 7768,
                                        },
                                },

                                ilpeth: {
                                        relation: 'child',
                                        plugin: 'ilp-plugin-ethereum',
                                        assetCode: 'ETH',
                                        assetScale: 9,
                                        options: {
                                                role: 'server',
                                                ethereumPrivateKey: process.env.KOVAN_PRIVATE,
                                                port: 7442,
                                                prefix: 'private.asym.eth',
                                                ethereumProvider: 'https://kovan.infura.io/bXIbx0x6ofEuDANTSeKI',
                                                incomingChannelFee: '0',
                                                maxPacketAmount: convert('0.0001', Unit.Eth, Unit.Gwei),
                                                outgoingChannelAmount: convert(new BigNumber(0.013), Unit.Eth, Unit.Gwei).toString(),
                                                balance: {
                                                        maximum: '0',
                                                        settleTo: convert('0', Unit.Eth, Unit.Gwei),
                                                        settleThreshold: convert('-0.00000001', Unit.Eth, Unit.Gwei)
                                                }
                                        },
                                },

                                // paychan: {
                                //      relation: 'child',
                                //      plugin: 'ilp-plugin-xrp-asym-server',
                                //      assetCode: 'XRP',
                                //      assetScale: 9,
                                //      options: {
                                //              port: 7443,
                                //              xrpServer: 'wss://s1.ripple.com',
                                //              address: process.env.XRP_ADDRESS,
                                //              secret: process.env.XRP_SECRET,
                                //      },
                                // },

                        })
                },
        }],
}
