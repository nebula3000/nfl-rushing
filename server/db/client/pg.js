const { Client } = require('pg')
module.exports = new Client(require('app/config').db.client)
