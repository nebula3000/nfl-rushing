module.exports = function (yards) {
    let value = (yards || 0).toString().replaceAll(',', '').replaceAll(' ', '')
    return Number(value)
}
