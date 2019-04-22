
class AuthenticateMiddleware {
    authenticate (req, res, next)  {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(403).json({
                status: 403,
                message: 'FORBIDDEN'
            })
        } else {
            next();
        }
    }
}

module.exports = new AuthenticateMiddleware();


