const csvWriter = require('csv-writer')
const createCsvStringifier = csvWriter.createObjectCsvStringifier
const csvStringifier = createCsvStringifier({
    header: [
        { id: 'player', title: 'Player' },
        { id: 'team', title: 'Team' },
        { id: 'pos', title: 'Pos' },
        { id: 'att', title: 'Att' },
        { id: 'att_g', title: 'Att/G' },
        { id: 'yds', title: 'Yds' },
        { id: 'yds_g', title: 'Yds/G' },
        { id: 'td', title: 'TD' },
        { id: 'lng', title: 'Lng' },
        { id: 'rush_1', title: '1st' },
        { id: 'rush_1_perc', title: '1st%' },
        { id: 'rush_20', title: '20+' },
        { id: 'rush_40', title: '40+' },
        { id: 'fumbles', title: 'FUM' },
    ],
})

module.exports = {
    header: function () {
        return csvStringifier.getHeaderString()
    },
    records: function (players) {
        return csvStringifier.stringifyRecords(players)
    },
}
