module.exports = {
    client: {
        user: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: 'nfl',
        port: process.env.DB_PORT || 5500,
    },
    tables: {
        leaderboard: 'leaderboard',
    },
}
