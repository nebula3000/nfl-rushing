const { playersService } = require('players/service')
const dbMappings = require('app/db/mappings')
const queryParser = require('app/services/query-parser')

async function fetchBySorter({ name, sort, by }, rank) {
    if (rank === 0) {
        rank = 1
    }
    const { players: playersFound, total } = playersService.getPlayersBySorter(
        sort,
        by,
        rank
    )
    const playerIds = playersFound.map(x => x.key)
    const playersDetails = await playersService.getPlayers(playerIds)
    const players = playersDetails.map(playerDetail => {
        playerDetail.rank = playersFound.find(
            p => p.key === playerDetail.id
        ).rank
        return playerDetail
    })

    return {
        players,
        total,
    }
}

async function fetchByName({ name, sort, by }, rank) {
    const sortMapped = dbMappings.sort[sort]
    const rows = await playersService.getPlayersByName({
        name,
        sort: sortMapped,
        dir: by,
        offset: Math.max(rank - 1, 0),
    })
    const playerIds = rows.map(x => x.id)
    const playerDetails = await playersService.getPlayers(playerIds)
    const total = rows.length === 0 ? 0 : Number(rows[0].total)
    const players = playerDetails.map((p, i) => {
        if (by === 'desc') {
            p.rank = i + Number(rank || 1)
        } else {
            p.rank = total - Number(rank || 1) - i + 1
        }

        return p
    })

    return {
        players,
        total,
    }
}

module.exports = async function ({ q, rank }) {
    const { name, sort, by } = queryParser(q)
    rank = Number(rank || 0)

    if (name === '') {
        return fetchBySorter({ name, sort, by }, rank)
    } else {
        return fetchByName({ name, sort, by }, rank)
    }
}
