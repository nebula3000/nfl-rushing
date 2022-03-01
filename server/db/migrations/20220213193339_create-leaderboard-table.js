const config = require('app/config')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return new Promise(async (resolve, reject) => {
        try {
            await knex.schema.createTable(
                config.db.tables.leaderboard,
                table => {
                    table.increments()
                    table.string('player', 100)
                    table.string('team', 3)
                    table.string('pos', 3)
                    table.float('avg')
                    table.integer('att').defaultTo(0).notNullable()
                    table.float('att_g')
                    table.integer('yds').defaultTo(0).notNullable().index()
                    table.float('yds_g')
                    table.float('yds_avg')
                    table.integer('td').defaultTo(0).notNullable()
                    table.integer('lng').defaultTo(0).notNullable()
                    table.boolean('lng_t').defaultTo(false).notNullable()
                    table.integer('rush_1')
                    table.float('rush_1_perc', 2)
                    table.integer('rush_20').defaultTo(0).notNullable()
                    table.integer('rush_40').defaultTo(0).notNullable()
                    table.integer('fumbles').defaultTo(0).notNullable()
                }
            )
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = function (knex) {
    return knex.schema.dropTable(config.db.tables.leaderboard)
}
