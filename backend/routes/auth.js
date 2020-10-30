const authController = require('./../controllers/AuthController')

module.exports = (router) => {
    router.route('/auth/login').post(authController.loginAttemp)
    router.route('/auth/user').get(authController.checkToken)
}