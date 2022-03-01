const config = require('app/config')

const TABLE = config.db.tables.leaderboard

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.raw(`
        CREATE INDEX IF NOT EXISTS ${TABLE}_yds_index ON ${TABLE} USING btree (yds);
        CREATE INDEX IF NOT EXISTS ${TABLE}_td_index ON ${TABLE} USING btree (td);
        CREATE INDEX IF NOT EXISTS ${TABLE}_lng_index ON ${TABLE} USING btree (lng);
    `)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.raw(`
        DROP INDEX IF EXISTS ${TABLE}_yds_index;
        DROP INDEX IF EXISTS ${TABLE}_td_index;
        DROP INDEX IF EXISTS ${TABLE}_lng_index;
    `)
}
