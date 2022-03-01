const download = require('./download.js')

describe('formatter.download()', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern')
        jest.setSystemTime(new Date(2022, 2, 28, 10, 0, 0))
    })

    afterAll(() => {
        jest.useRealTimers()
    })

    test('filename and png', () => {
        const actual = download('filename', 'png')
        expect(actual).toStrictEqual('filename_2022_03_28_14_00_00_000.png')
    })

    test('filename missing - filename without filename', () => {
        const actual = download('', 'jpeg')
        expect(actual).toStrictEqual('_2022_03_28_14_00_00_000.jpeg')
    })

    test('extension missing - filename without dot', () => {
        const actual = download('filename', '')
        expect(actual).toStrictEqual('filename_2022_03_28_14_00_00_000')
    })
})
