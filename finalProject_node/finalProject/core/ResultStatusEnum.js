

class ResultStatusEnum {

    constructor() {
        this.SUCCESS = "SUCCESS";
        this.AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR';
        this.UNKNOWN_ERROR = 'UNKNOWN_ERROR';
    }
}

module.exports = new ResultStatusEnum();