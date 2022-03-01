const query = require('./db/query-players-details')
const getRankRange = require('app/lib/sorted-skip-list/get-rank-range')
const sorters = require('app/services/sorters')

const sortersByName = {
    longest_rush: sorters.longestRush,
    total_rushing_yards: sorters.totalRushingYards,
    total_rushing_touchdowns: sorters.totalRushingTouchdowns,
}

function getPlayersBySorter(sort, dir, start = 0) {
    if (dir === 'asc') {
        start = -start
    }
    const result = { players: [], total: 0 }
    const sorter = sortersByName[sort]
    if (sorter) {
        result.players = getRankRange(sorter, start)
        if (dir === 'asc') {
            result.players.reverse()
        }
        result.total = sorter.size
    }
    return result
}

module.exports = {
    getPlayers: query.byIds,
    getPlayersAll: query.all,
    getPlayersByName: query.byName,
    getPlayersBySorter,
}
