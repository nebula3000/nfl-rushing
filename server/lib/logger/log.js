module.exports = function (...msg) {
    if (!Array.isArray(msg)) {
        msg = [msg]
    }
    const { namespace } = msg[0]
    if (namespace) {
        msg.shift()
        console.log(`[${namespace}]`, ...msg)
    } else {
        console.log(...msg)
    }
}
