const MAX_HEIGHT = 32

class Node {
    constructor({ key, score, height }) {
        this.key = key
        this.score = score
        this.level = [...new Array(height)].map(_ => ({
            forward: null,
            span: 0,
        }))
    }

    greaterOrHasPrecedence({ score, key }) {
        return this.score > score || (this.score === score && this.key < key)
    }
}

function height() {
    if (Math.random() > 0.65) return 1

    let lvl
    for (lvl = 1; Math.floor(Math.random() * MAX_HEIGHT) % 2 === 0; lvl++) {}
    return lvl < MAX_HEIGHT ? lvl : MAX_HEIGHT
}

class RankedSkipList {
    constructor({ maxLevel } = {}) {
        this.level = Number(maxLevel || 0) <= 0 ? MAX_HEIGHT : maxLevel
        this.head = new Node({ key: 'head', height: MAX_HEIGHT })
        this.size = 0
        this.update = new Array(this.level)
        this.rank = new Array(this.level)
    }

    insert(key, score) {
        let x = this.head

        const n = this.level
        const update = this.update
        const rank = this.rank

        for (let i = n - 1; i >= 0; i--) {
            rank[i] = Number(rank[i + 1]) || 0
            while (
                x.level[i].forward &&
                x.level[i].forward.greaterOrHasPrecedence({ score, key })
            ) {
                rank[i] += x.level[i].span
                x = x.level[i].forward
            }

            if (x) {
                update[i] = x.level[i]
            } else {
                update[i] = { forward: null, span: 0 }
            }
        }

        const h = height()
        const y = new Node({ key, score, height: h })

        for (let i = 0; i < h; i++) {
            y.level[i].forward = update[i].forward
            update[i].forward = y

            y.level[i].span = update[i].span - (rank[0] - rank[i])
            update[i].span = rank[0] - rank[i] + 1
        }

        for (let i = h; i < this.level; i++) {
            update[i].span += 1
        }

        this.size += 1
    }
}

module.exports = RankedSkipList
