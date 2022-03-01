const config = require('app/config')

const TABLE = config.db.tables.leaderboard

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.raw(`
        CREATE OR REPLACE FUNCTION public.${TABLE}_player_inserted()
          RETURNS trigger
          LANGUAGE plpgsql
        AS $$
        BEGIN   
          PERFORM pg_notify('player_inserted', row_to_json(NEW)::text);
          RETURN NULL;
        END;
        $$        
    `)

    return knex.raw(`
        CREATE TRIGGER tr_${TABLE}_insert_notify
        AFTER INSERT ON ${TABLE}
        FOR EACH ROW EXECUTE PROCEDURE public.${TABLE}_player_inserted();
    `)
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.raw(`
        DROP TRIGGER IF EXISTS tr_${TABLE}_insert_notify ON ${TABLE};
        DROP FUNCTION IF EXISTS ${TABLE}_player_inserted;
    `)
}
