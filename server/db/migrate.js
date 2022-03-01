const knexClient = require('app/db/client/knex')
const knexfile = require('app/db/knexfile.js')
const path = require('path')

module.exports = async function migrate() {
    const options = Object.assign({}, knexfile.development.migrations, {
        directory: path.join(__dirname, 'migrations'),
    })

    await knexClient.migrate.latest(options)
}
