class ExporterNotFoundError extends Error {
    constructor(type) {
        super(`exporter for type '${type}' not found`)
        this.name = this.constructor.name
        this.error = 'NotFoundError'
        this.statusCode = 404
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ExporterNotFoundError
