const fastify = require('fastify')({ logger: true })

const routes = require('app/routes.js')
const config = require('app/config')
const { pgNotifications, dbMigrations } = require('app/initializers')
const { loadSorters, insertNewPlayer } = require('app/services/sorters')
const { log, fatal } = require('app/lib/logger')

async function initializers() {
    const namespace = 'initializers'

    try {
        await pgNotifications({ onPlayerInserted: insertNewPlayer })
        await dbMigrations()
        log({ namespace }, 'successful')
    } catch (e) {
        fatal({ namespace }, e)
    }
}

async function loaders() {
    const namespace = 'loaders'

    try {
        await loadSorters()
        log({ namespace }, 'successful')
    } catch (e) {
        fatal({ namespace }, e)
    }
}

async function webserver() {
    const namespace = 'webserver'
    routes(fastify)

    fastify.listen(config.server.port, config.server.host, err => {
        if (err) {
            fatal({ namespace }, err)
        } else {
            log(
                { namespace },
                `[${process.env.NODE_ENV}]Server running on: ${config.server.host}:${config.server.port}`
            )
        }
    })
}

async function start() {
    await initializers()
    await loaders()
    await webserver()
}

start()
