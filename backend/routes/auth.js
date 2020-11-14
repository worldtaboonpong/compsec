const authController = require('./../controllers/AuthController')
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10
});

module.exports = (router) => {
    router.use('/auth/login', apiLimiter)
    router.route('/auth/login').post(authController.loginAttemp)
    router.route('/auth/user').get(authController.checkToken)
}