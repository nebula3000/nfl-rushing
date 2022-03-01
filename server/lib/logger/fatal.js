module.exports = function (...msg) {
    if (!Array.isArray(msg)) {
        msg = [msg]
    }
    const { namespace } = msg[0]
    if (namespace) {
        msg.shift()
        console.error(`[FATAL!] [${namespace}]`, ...msg)
    } else {
        console.error('[FATAL!]', ...msg)
    }

    process.exit(1)
}
