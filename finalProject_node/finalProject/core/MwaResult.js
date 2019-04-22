const resultStatusEnum = require('../core/ResultStatusEnum');

class MwaResult {
    constructor() {
        this.status = resultStatusEnum.UNKNOWN_ERROR;
        this.data = {};
    }
}

module.exports = MwaResult;