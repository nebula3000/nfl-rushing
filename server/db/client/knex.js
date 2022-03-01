const knex = require('knex')
const knexfile = require('app/db/knexfile.js')

module.exports = knex({
    client: knexfile.development.client,
    connection: knexfile.development.connection,
})
