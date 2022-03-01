export class Player {
    constructor(name, team, position, stats) {
        this.name = name
        this.team = team
        this.pos = position
        this.attempts = stats.att
        this.attemptsPerGame = stats.att_g
        this.yds = stats.yds
        this.yds_g = stats.yds_g
        this.yds_avg = stats.yds_avg
        this.touchdowns = stats.td
        this.lng = stats.lng
        this.lng_t = stats.lng_t
        this.rush_1 = stats.rush_1
        this.rush_1_perc = stats.rush_1_perc
        this.rush_20 = stats.rush_20
        this.rush_40 = stats.rush_40
        this.fumbles = stats.fum
    }
}
