var jwt = require('jsonwebtoken');


const secret = 'mwa_secret';

class MwaJwtManager {

    generate(user) {
        var token = jwt.sign(user, secret);
        return token;
    }

    verify(token) {
        var user = jwt.verify(token, secret);
        return user;
    }

}

module.exports = new MwaJwtManager();