const {StatusCodes} = require('http-status-codes');

class validatioError extends Error {
    constructor(error) {
        super();
        let explanation = [];
        error.errors.forEach(function(err) {
             explanation.push(err.message)
            });
            this.name = 'validatioError',
            this.message = 'Invalid request',
            this.explanation = explanation,
            this.statusCode = StatusCodes.BAD_REQUEST
        }
}

module.exports = validatioError;