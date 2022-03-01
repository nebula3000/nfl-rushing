const config = require('app/config')

const TABLE = config.db.tables.leaderboard

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.raw(`
        CREATE EXTENSION pg_trgm;
        CREATE INDEX ${TABLE}_player_index ON ${TABLE} USING GIN (player gin_trgm_ops);
    `)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.raw(`
        DROP INDEX IF EXISTS ${TABLE}_player_index;
        DROP EXTENSION IF EXISTS pg_trgm;
    `)
}
