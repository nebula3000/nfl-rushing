const { SortedSkipList } = require('app/lib/sorted-skip-list')

const totalRushingYards = new SortedSkipList()
const totalRushingTouchdowns = new SortedSkipList()
const longestRush = new SortedSkipList()

module.exports = {
    totalRushingYards,
    totalRushingTouchdowns,
    longestRush,
}
