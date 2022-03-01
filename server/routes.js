const path = require('path')
const exporterController = require('exporter/controller')
const playersController = require('players/controller')
const generatorController = require('app/components/generator/controller')
const formatter = require('app/lib/formatter')

function registerStaticFolder(fastify) {
    fastify.register(require('fastify-static'), {
        root: path.join(__dirname, 'public'),
    })
}

module.exports = function (fastify) {
    registerStaticFolder(fastify)

    fastify.register((instance, opts, next) => {
        instance.get('/', async (req, reply) => reply.sendFile('index.html'))
        instance.get('/api/search/players', async (req, reply) => {
            const { players, total } = await playersController.search(req.query)
            reply.send({ players, total })
        })
        instance.get('/api/export/players.:type', async (req, reply) => {
            const { type } = req.params
            const contentType = `text/${type}`
            const attachment = `attachment; filename=${formatter.download(
                'players',
                type
            )}`
            reply
                .header('Content-disposition', attachment)
                .type(contentType)
                .send(await exporterController.exportPlayers(type, req.query))
        })
        instance.post(
            '/api/admin/generate/players/:total',
            async (req, reply) => {
                const { total } = req.params
                await generatorController.generatePlayers(total)
                reply.send()
            }
        )
        next()
    })
}
