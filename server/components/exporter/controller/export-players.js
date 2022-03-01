const ExporterNotFoundError = require('../errors/exporter-type-not-found')
const { Readable } = require('stream')
const { playersService } = require('players/service')
const { csvService } = require('exporter/service')
const queryParser = require('app/services/query-parser')
const dbMappings = require('app/db/mappings')

module.exports = async function (type, { q }) {
    const { name, sort, by } = queryParser(q)
    switch (type) {
        case 'csv': {
            const buffer = new Readable()
            buffer._read = () => {}

            const csvHeader = csvService.header()
            const stream = playersService.getPlayersAll({
                name,
                sort: dbMappings.sort[sort],
                dir: by,
            })

            stream
                .on('data', player => {
                    const csvRecords = csvService.records([player])
                    buffer.push(csvRecords)
                })
                .on('error', () => {
                    buffer.push(null)
                })
                .on('end', () => {
                    buffer.push(null)
                })

            buffer.push(csvHeader)

            return buffer
        }
        default: {
            return new ExporterNotFoundError(type)
        }
    }
}
