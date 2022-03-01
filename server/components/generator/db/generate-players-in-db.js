const knexClient = require('app/db/client/knex.js')

module.exports = async function (total) {
    const params = { total }
    const sql = `        
        INSERT INTO leaderboard (
            player,
            team,
            avg,
            att,
            att_g,
            yds,
            yds_g,
            yds_avg,
            td,
            lng,
            lng_t,
            rush_1,
            rush_1_perc,
            rush_20,
            rush_40,
            fumbles
        )
        SELECT
            left(md5(i::text), 10),
            left(md5(i::text), 3),
        
            (random() * 10)::int,
            (random() * 1000)::int,
            (random() * 1000),
            (random() * 1000)::int,
            (random() * 1000),
            (random() * 1000),
            (random() * 1000)::int,
            (random() * 1000)::int,
            false,
        
            (random() * 100)::int,
            (random() * 1000),
        
            (random() * 100)::int,
            (random() * 100)::int,
            (random() * 1000)::int
        FROM generate_series(1, :total) s(i);
        
    `

    await knexClient.raw('SET session_replication_role = replica;')
    await knexClient.raw(sql, params)
    await knexClient.raw('SET session_replication_role = DEFAULT;')
}
