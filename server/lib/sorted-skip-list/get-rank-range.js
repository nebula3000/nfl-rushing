module.exports = function (list, start, offset = 10) {
    let x = list.head
    let rank = -1

    if (start < 0) {
        start = list.size - Math.abs(start) - offset + 2
    }

    for (let i = list.level - 1; i >= 0; i--) {
        while (x.level[i].forward && rank + x.level[i].span < start) {
            rank += x.level[i].span
            x = x.level[i].forward
        }
        if (rank === start) {
            break
        }
    }

    const result = []
    while (offset > 0 && x) {
        if (rank >= start - 1 && x.key !== 'head') {
            result.push({
                key: x.key,
                rank: rank + 1,
            })
        }
        x = x.level[0].forward
        offset -= 1
        rank += 1
    }

    return result
}
