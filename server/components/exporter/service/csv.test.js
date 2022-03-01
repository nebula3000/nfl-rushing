const { csvService } = require('./index.js')

describe('csv service - header', () => {
    test('returns all fields', () => {
        const header = csvService.header().replace('\n', '')
        expect(header).toStrictEqual(
            'Player,Team,Pos,Att,Att/G,Yds,Yds/G,TD,Lng,1st,1st%,20+,40+,FUM'
        )
    })
})

describe('csv service - records', () => {
    test('no player - all fields are empty', () => {
        const rows = csvService.records([{}]).replaceAll('\n', '')
        expect(rows).toStrictEqual(',,,,,,,,,,,,,')
    })

    test('1 player - returns all fields', () => {
        const rows = csvService
            .records([
                {
                    player: 'player',
                    team: 'team',
                    pos: 'pos',
                    att: 'att',
                    att_g: 'att_g',
                    yds: 'yds',
                    yds_g: 'yds_g',
                    td: 'td',
                    lng: 'lng',
                    rush_1: 'rush_1',
                    rush_1_perc: 'rush_1_perc',
                    rush_20: 'rush_20',
                    rush_40: 'rush_40',
                    fumbles: 'fumbles',
                },
            ])
            .replaceAll('\n', '')

        expect(rows).toStrictEqual(
            'player,team,pos,att,att_g,yds,yds_g,td,lng,rush_1,rush_1_perc,rush_20,rush_40,fumbles'
        )
    })

    test('2 players - returns all fields', () => {
        const rows = csvService
            .records([
                {
                    player: 'player',
                    team: 'team',
                    pos: 'pos',
                    att: 'att',
                    att_g: 'att_g',
                    yds: 'yds',
                    yds_g: 'yds_g',
                    td: 'td',
                    lng: 'lng',
                    rush_1: 'rush_1',
                    rush_1_perc: 'rush_1_perc',
                    rush_20: 'rush_20',
                    rush_40: 'rush_40',
                    fumbles: 'fumbles',
                },
                {
                    player: 'player',
                    team: 'team',
                    pos: 'pos',
                    att: 'att',
                    att_g: 'att_g',
                    yds: 'yds',
                    yds_g: 'yds_g',
                    td: 'td',
                    lng: 'lng',
                    rush_1: 'rush_1',
                    rush_1_perc: 'rush_1_perc',
                    rush_20: 'rush_20',
                    rush_40: 'rush_40',
                    fumbles: 'fumbles',
                },
            ])
            .slice(0, -1)

        const expected = [
            'player,team,pos,att,att_g,yds,yds_g,td,lng,rush_1,rush_1_perc,rush_20,rush_40,fumbles',
            'player,team,pos,att,att_g,yds,yds_g,td,lng,rush_1,rush_1_perc,rush_20,rush_40,fumbles',
        ]
        expect(rows).toStrictEqual(expected.join('\n'))
    })
})
