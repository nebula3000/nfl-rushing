module.exports = function (...msg) {
    if (!Array.isArray(msg)) {
        msg = [msg]
    }
    const { namespace } = msg[0]
    if (namespace) {
        msg.shift()
        console.error(`[${namespace}]`, ...msg)
    } else {
        console.error(...msg)
    }
}
