module.exports = function (query) {
    const result = {
        name: '',
        sort: 'lng',
        by: 'asc',
    }

    if (query) {
        const tokens = query.split(':')
        if (tokens.length > 0) {
            result.name = tokens[0]
        }
        if (tokens.length > 1 && tokens[1]) {
            result.sort = tokens[1]
        }
        if (tokens.length > 2 && tokens[2]) {
            result.by = tokens[2]
        }
    }

    return result
}
