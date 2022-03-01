const generatePlayersInDB = require('app/components/generator/db/generate-players-in-db.js')

module.exports = async function (total) {
    await generatePlayersInDB(total)
}
