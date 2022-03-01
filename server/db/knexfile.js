// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const dev = {
    client: 'postgresql',
    connection: {
        database: 'nfl',
        user: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5500,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'migrations',
    },
}
module.exports = {
    development: dev,
    staging: dev,
    production: dev,
}
