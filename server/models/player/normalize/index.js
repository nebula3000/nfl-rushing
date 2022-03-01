const attempts = require('./fields/attempts.js')
const lngRush = require('./fields/longest_rush.js')
const player = require('./fields/player.js')
const position = require('./fields/position.js')
const team = require('./fields/team.js')
const totalTouchdowns = require('./fields/total_touchdowns.js')
const yards = require('./fields/yards.js')
const avg = require('./fields/avg.js')
const rushing = require('./fields/rushing')
const fumbles = require('./fields/fumbles')

module.exports = function (record) {
    const [longestRush, longestRushHasTouchdown] = lngRush(record['Lng'])
    return {
        player: player(record['Player']),
        team: team(record['Team']),
        pos: position(record['Pos']),
        avg: avg(record['Avg']),
        att: attempts(record['Att']),
        att_g: attempts(record['Att/G']),
        yds: yards(record['Yds']),
        yds_g: yards(record['Yds/G']),
        yds_avg: yards(record['avg']),
        td: totalTouchdowns(record['TD']),
        lng: longestRush,
        lng_t: longestRushHasTouchdown,
        rush_1: rushing(record['20+']),
        rush_1_perc: rushing(record['20+']),
        rush_20: rushing(record['20+']),
        rush_40: rushing(record['40+']),
        fumbles: fumbles(record['FUM']),
    }
}
