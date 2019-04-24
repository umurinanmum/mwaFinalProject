
const jwt = require('../jwt/MwaJwtManager')

class AuthenticateMiddleware {
    authenticate(req, res, next) {

        console.log('req.url ' + req.url);

        if (req.url === '/api/users/login'
            || req.url === '/api/users/register'
            || req.url === '/api/users/login/'
            || req.url === '/api/users/register/') {
            next();
            return;
        } else {
            const authHeader = req.headers.authorization

            if (!authHeader) {
                return res.status(403).json({
                    status: 403,
                    message: 'FORBIDDEN'
                })
            } else {
                const splitted = authHeader.split(' ');
                if (splitted.length < 2) {
                    return res.status(403).json({
                        status: 403,
                        message: 'FORBIDDEN'
                    })
                }
                const token = splitted[1];
                var user = jwt.verify(token);
                if (!user) {
                    return res.status(403).json({
                        status: 403,
                        message: 'FORBIDDEN'
                    })
                }

                if (req.url === '/api/users' || req.url === '/api/users/') {
                    if (!user.role || user.role != 'admin') {
                        return res.status(403).json({
                            status: 403,
                            message: 'FORBIDDEN'
                        })
                    }
                }

                next();
            }
        }
    }
}

module.exports = new AuthenticateMiddleware();


