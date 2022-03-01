module.exports = function (filename, ext) {
    const dateFormat = new Date()
        .toISOString()
        .trim()
        .replaceAll('-', '_')
        .replaceAll(':', '_')
        .replaceAll('.', '_')
        .replaceAll('T', '_')
        .replaceAll('Z', '')

    if (ext) {
        return `${filename}_${dateFormat}.${ext}`
    }

    return `${filename}_${dateFormat}`
}
