const config = require('../config')
const jwt = require("jsonwebtoken");
const usercontroller = require("./../controllers/UserController");

module.exports = (router) => {
  router.route("/user/:id").get(usercontroller.getUser);
  router.route("/user").post(usercontroller.addUser);
  router.route("/users").get(function(req,res,next){
      if (!req.headers){
          return res.status(401).send({auth:false, message:'No token provided'});

      }
      var token = req.headers['x-access-token'];
      if (!token) {
          return res.status(401).send( {auth:false,message:'No token provided'})
      }
      jwt.verify(token , config.secret, function(err,decoded){
          if (err) { 
              return res.status(500).send({auth:false,message:'Failed to authenticate'})
          }
          next();
      })
  },usercontroller.getAllUsers);
};
