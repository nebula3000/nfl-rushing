const config = require('app/config')
const knexClient = require('app/db/client/knex.js')

const columns = [
    'id',
    'player',
    'team',
    'pos',
    'avg',
    'att',
    'att_g',
    'yds',
    'yds_g',
    'yds_avg',
    'td',
    'lng',
    'lng_t',
    'rush_1',
    'rush_1_perc',
    'rush_20',
    'rush_40',
    'fumbles',
]

module.exports = {
    all: function ({ name, sort, dir = 'asc' }) {
        return knexClient
            .table(config.db.tables.leaderboard)
            .select()
            .columns(columns)
            .whereRaw('player ilike ?', `%${name}%`)
            .orderBy(sort, dir)
            .orderBy('id')
            .stream()
    },
    byIds: async function (ids) {
        if (!ids) {
            return []
        }

        const result = await knexClient
            .table(config.db.tables.leaderboard)
            .select()
            .columns(columns)
            .whereIn('leaderboard.id', ids)
            .joinRaw(
                'join unnest(array[:ids:]) with ordinality as l(oid, idx) ON "leaderboard"."id"::text = l.oid::text',
                { ids }
            )
            .orderByRaw(knexClient.raw('l.idx'))
        return result
    },
    byName: async function ({ name, sort, dir = 'asc', offset = 0 }) {
        var params = {
            name: `%${name}%`,
            sort,
            dir: knexClient.raw(dir),
            offset,
        }
        const result = await knexClient.raw(
            `        
        WITH players AS (
           SELECT id FROM leaderboard WHERE player ilike :name ORDER BY :sort: :dir, player LIMIT 1000
        )
        SELECT id, (SELECT count(*) from players) as total FROM players
        OFFSET :offset LIMIT 10        
    `,
            params
        )
        return result.rows
    },
}
