var jwt = require('jsonwebtoken');


const secret = 'mwa_secret';

class MwaJwtManager{

    generate(user){
        var token = jwt.sign(user, secret);
        return token;
    }

}

module.exports = new MwaJwtManager();