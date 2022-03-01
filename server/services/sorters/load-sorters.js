const config = require('app/config')
const knexClient = require('app/db/client/knex.js')
const insertNewPlayer = require('./insert-new-player')

async function loadSorters() {
    return new Promise((resolve, reject) => {
        const stream = knexClient
            .select('id', 'lng', 'td', 'yds')
            .table(config.db.tables.leaderboard)
            .stream()

        stream
            .on('data', insertNewPlayer)
            .on('error', reject)
            .on('end', resolve)
    })
}

module.exports = loadSorters
