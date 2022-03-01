const {
    totalRushingYards,
    totalRushingTouchdowns,
    longestRush,
} = require('./sorters.js')

function insertNewPlayer({ id, yds, td, lng }) {
    totalRushingYards.insert(id, yds)
    totalRushingTouchdowns.insert(id, td)
    longestRush.insert(id, lng)
}

module.exports = insertNewPlayer
