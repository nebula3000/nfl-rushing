module.exports = function (rush) {
    rush = (rush || '').toString()
    const hasTouchdown = rush.endsWith('T') || rush.endsWith('T')
    const value = rush.substring(0, rush.length - Number(hasTouchdown))
    return [Number(value), hasTouchdown]
}
