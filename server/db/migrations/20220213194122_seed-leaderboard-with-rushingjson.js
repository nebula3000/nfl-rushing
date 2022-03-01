const path = require('path')
const fs = require('fs/promises')
const normalize = require('app/models/player/normalize')
const config = require('app/config')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return new Promise(async (resolve, reject) => {
        const rushingFile = path.join(__dirname, 'seed', 'rushing.json')
        try {
            const result = await fs.readFile(rushingFile)
            await knex
                .table(config.db.tables.leaderboard)
                .insert(JSON.parse(result.toString()).map(normalize))
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {}
