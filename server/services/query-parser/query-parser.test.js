const queryParser = require('./query-parser')

describe('queryParser()', () => {
    const defaults = { name: '', sort: 'lng', by: 'asc' }
    test('empty - returns default', () => {
        const actual = queryParser('')
        expect(actual).toStrictEqual(defaults)
    })

    test('1 token - returns name property and rest is default', () => {
        const actual = queryParser('name')
        const expected = { name: 'name', sort: 'lng', by: 'asc' }
        expect(actual).toStrictEqual(expected)
    })

    test('2 tokens - returns name and sort properties and rest is default', () => {
        const actual = queryParser('name:sort')
        const expected = { name: 'name', sort: 'sort', by: 'asc' }
        expect(actual).toStrictEqual(expected)
    })

    test('3 tokens - returns name, sort and by properties', () => {
        const actual = queryParser('name:sort:by')
        const expected = { name: 'name', sort: 'sort', by: 'by' }
        expect(actual).toStrictEqual(expected)
    })

    test('name is empty - returns empty name', () => {
        const actual = queryParser(':sort:by')
        const expected = { name: '' }
        expect(actual.name).toStrictEqual(expected.name)
    })

    test('sort is empty - returns default sort', () => {
        const actual = queryParser('name::by')
        expect(actual.sort).toStrictEqual(defaults.sort)
    })

    test('by is empty - returns default by', () => {
        const actual = queryParser('name:sort:')
        expect(actual.by).toStrictEqual(defaults.by)
    })
})
