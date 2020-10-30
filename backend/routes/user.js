const usercontroller = require("./../controllers/UserController");

module.exports = (router) => {
  router.route("/user/:id").get(usercontroller.getUser);
  router.route("/user").post(usercontroller.addUser);
  router.route("/users").get(usercontroller.getAllUsers);
};
