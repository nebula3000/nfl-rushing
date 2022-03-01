const pgclient = require('app/db/client/pg.js')
const logger = require('app/lib/logger')

const namespace = 'pg-notification'

async function start({ onPlayerInserted }) {
    try {
        await pgclient.connect()
    } catch (e) {
        return logger.error({ namespace }, e)
    }

    pgclient.query('LISTEN player_inserted')
    pgclient.on('notification', msg => {
        switch (msg.channel) {
            case 'player_inserted': {
                onPlayerInserted(msg.payload)
                break
            }
        }
    })
}

module.exports = start
