const RankedSkipList = require('./ranked-skip-list')
const getRankRange = require('./get-rank-range')

describe('getRankRange() - no ties', () => {
    const skiplist = new RankedSkipList({ maxLevel: 8 })

    beforeAll(() => {
        skiplist.insert(4, 4)
        skiplist.insert(3, 3)
        skiplist.insert(2, 2)
        skiplist.insert(1, 1)
    })

    test('return rank when range == 1', done => {
        expect(getRankRange(skiplist, 1, 1)).toStrictEqual([
            { key: 4, rank: 1 },
        ])
        expect(getRankRange(skiplist, 2, 1)).toStrictEqual([
            { key: 3, rank: 2 },
        ])
        expect(getRankRange(skiplist, 3, 1)).toStrictEqual([
            { key: 2, rank: 3 },
        ])
        expect(getRankRange(skiplist, 4, 1)).toStrictEqual([
            { key: 1, rank: 4 },
        ])
        done()
    })

    test('return rank when range == 2', done => {
        expect(getRankRange(skiplist, 1, 2)).toStrictEqual([
            { key: 4, rank: 1 },
            { key: 3, rank: 2 },
        ])
        expect(getRankRange(skiplist, 2, 2)).toStrictEqual([
            { key: 3, rank: 2 },
            { key: 2, rank: 3 },
        ])
        expect(getRankRange(skiplist, 3, 2)).toStrictEqual([
            { key: 2, rank: 3 },
            { key: 1, rank: 4 },
        ])
        expect(getRankRange(skiplist, 4, 2)).toStrictEqual([
            { key: 1, rank: 4 },
        ])
        done()
    })

    test('return rank when range == size', done => {
        expect(getRankRange(skiplist, 1, skiplist.size)).toStrictEqual([
            { key: 4, rank: 1 },
            { key: 3, rank: 2 },
            { key: 2, rank: 3 },
            { key: 1, rank: 4 },
        ])
        done()
    })

    test('return rank when range == size + 1', done => {
        expect(getRankRange(skiplist, 1, skiplist.size + 1)).toStrictEqual([
            { key: 4, rank: 1 },
            { key: 3, rank: 2 },
            { key: 2, rank: 3 },
            { key: 1, rank: 4 },
        ])
        done()
    })

    test('return rank when range == 0', done => {
        expect(getRankRange(skiplist, 1, 0)).toStrictEqual([])
        done()
    })
})

describe('getRankRange() - with ties', () => {
    const skiplist = new RankedSkipList({ maxLevel: 8 })
    beforeAll(() => {
        skiplist.insert(3, 2)
        skiplist.insert(4, 2)
        skiplist.insert(1, 1)
        skiplist.insert(2, 1)
    })

    test('return rank when range == 1', done => {
        expect(getRankRange(skiplist, 1, 1)).toStrictEqual([
            { key: 3, rank: 1 },
        ])
        done()
    })

    test('return rank when range == 2', done => {
        expect(getRankRange(skiplist, 1, 2)).toStrictEqual([
            { key: 3, rank: 1 },
            { key: 4, rank: 2 },
        ])
        expect(getRankRange(skiplist, 2, 2)).toStrictEqual([
            { key: 4, rank: 2 },
            { key: 1, rank: 3 },
        ])
        expect(getRankRange(skiplist, 3, 2)).toStrictEqual([
            { key: 1, rank: 3 },
            { key: 2, rank: 4 },
        ])
        expect(getRankRange(skiplist, 4, 2)).toStrictEqual([
            { key: 2, rank: 4 },
        ])
        done()
    })

    test('return rank when range == size', done => {
        expect(getRankRange(skiplist, 1, skiplist.size)).toStrictEqual([
            { key: 3, rank: 1 },
            { key: 4, rank: 2 },
            { key: 1, rank: 3 },
            { key: 2, rank: 4 },
        ])
        done()
    })

    test('return rank when range == size + 1', done => {
        expect(getRankRange(skiplist, 1, skiplist.size + 1)).toStrictEqual([
            { key: 3, rank: 1 },
            { key: 4, rank: 2 },
            { key: 1, rank: 3 },
            { key: 2, rank: 4 },
        ])
        done()
    })

    test('return rank when range == 0', done => {
        expect(getRankRange(skiplist, 1, 0)).toStrictEqual([])
        done()
    })
})
