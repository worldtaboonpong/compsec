const User = require("./../models/User");

module.exports = {
  addUser: (req, res, next) => {
    const saveuser = req.body;
    const user = new User(saveuser);

    user.save((err, newUser) => {
      if (err) res.send(err);
      else if (!newUser) res.send(400);
      else res.send(newUser);
      next();
    });
  },
  getUser: (req, res, next) => {
    const userid = req.params.id;
    User.findById(userid).then((err, user) => {
      if (err) res.send(err);
      else if (!user) res.send(400);
      else res.send(user);
      next();
    });
  },
  getAllUsers: (req, res, next) => {
    User.find((err, users) => {
      if (err) res.send(err);
      else if (!users) res.send(400);
      else res.send(users);
      next();
    });
  },
};
