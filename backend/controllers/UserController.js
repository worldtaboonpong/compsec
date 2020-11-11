const User = require("./../models/User");
const bcrypt = require("bcryptjs");
const { getCurrentUser } = require("./../controllers/AuthController");

module.exports = {
    addUser: (req, res, next) => {
        if (req.body.password) {
            var hashedPassword = bcrypt.hashSync(req.body.password, 8);
            req.body.password = hashedPassword;
        }
        const saveuser = req.body;
        const user = new User(saveuser);
        if (!saveuser._id) {
            user.save((err, newUser) => {
                if (err) res.send(err);
                else if (!newUser) res.send(400);
                else newUser.password = undefined;
                res.send(newUser);
                next();
            });
        } else {
            let currentUser;
            try {
                currentUser = getCurrentUser(req);
            } catch (err) {
                return res.status(400).send(err);
            }
            if (currentUser.id != req.body._id && currentUser.role != 1)
                return res.status(401).send("You are NOT ALLOWED");
            User.findById(req.body._id, function (err, user) {
                if (err) return handleError(err);
                user.set(saveuser);
                user.save((err, updateUser) => {
                    if (err) res.send(err);
                    else if (!updateUser) res.send(400);
                    else updateUser.password = undefined;
                    res.send(updateUser);
                    next();
                });
            });
        }
    },
    getUser: (req, res, next) => {
        const userid = req.params.id;
        let currentUser;
        try {
            currentUser = getCurrentUser(req);
        } catch (err) {
            return res.status(400).send(err);
        }
        if (currentUser.id != userid && currentUser.role != 1)
            return res.status(401).send("You are NOT ALLOWED");
        User.findById(userid, { password: 0 }).then((err, user) => {
            if (err) res.send(err);
            else if (!user) res.send(400);
            else res.send(user);
            next();
        });
    },
    getAllUsers: (req, res, next) => {
        let currentUser;
        try {
            currentUser = getCurrentUser(req);
        } catch (err) {
            return res.status(400).send(err);
        }
        if (currentUser.role != 1)
            return res.status(401).send("You are NOT ALLOWED");
        User.find({}, { password: 0 }).then((err, users) => {
            if (err) res.send(err);
            else if (!users) res.send(400);
            else res.send(users);
            next();
        });
    },
};
