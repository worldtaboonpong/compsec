const Post = require("./../models/Post");
const { getCurrentUser } = require("./../controllers/AuthController");

module.exports = {
    addPost: (req, res, next) => {
        const savepost = req.body;
        const post = new Post(savepost);
        let currentUser;
        try {
            currentUser = getCurrentUser(req);
        } catch (err) {
            return res.send(err);
        }
        console.log(currentUser);
        console.log(post);
        if (currentUser.id != post.author && currentUser.role != 1) {
            return res.status(401).send("You are NOT ALLOWED");
        }
        if (!savepost._id) {
            post.save((err, newPost) => {
                if (err) res.send(err);
                else if (!newPost) res.send(400);
                else res.send(newPost);
                next();
            });
        } else {
            Post.findById(req.body._id, function (err, post) {
                if (err) return handleError(err);
                post.set(savepost);
                post.save((err, updatePost) => {
                    if (err) res.send(err);
                    else if (!updatePost) res.send(400);
                    else res.send(updatePost);
                    next();
                });
            });
        }
    },
    getPost: (req, res, next) => {
        const postid = req.params.id;
        Post.findById(postid)
            .populate("author")
            .populate({ path: "comments.author", select: "name" })
            .exec((err, post) => {
                if (err) res.send(err);
                else if (!post) res.send(400);
                else res.send(post);
                next();
            });
    },
    getAllPosts: (req, res, next) => {
        Post.find()
            .populate("author")
            .exec((err, posts) => {
                if (err) res.send(err);
                else if (!posts) res.send(400);
                else res.send(posts);
                next();
            });
    },
    removePost: async (req, res, next) => {
        let currentUser;
        try {
            currentUser = getCurrentUser(req);
        } catch (err) {
            return res.send(err);
        }
        const request = req.body;
        let post = await Post.findById(request._id)
            .exec()
            .catch((err) => res.send(err));
        if (post.author == currentUser.id || currentUser.role == 1) {
            Post.findByIdAndRemove(request._id, (err, post) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send({ post: post, message: "deleted" });
                }
            });
        } else {
            return res.status(401).send("You are NOT ALLOWED");
        }
    },
    saveComment: (req, res, next) => {
        const request = req.body;
        const id = request.id;
        let currentUser;
        try {
            currentUser = getCurrentUser(req);
        } catch (err) {
            return res.send(err);
        }

        if (request.author != currentUser.id && currentUser.role != 1)
            return res.status(401).send("You are NOT ALLOWED");

        Post.findById(id).exec((err, post) => {
            if (err) {
                res.send(err);
            }
            post.comment({
                author: request.author,
                text: request.text,
                username: request.username,
                comment_id: request.comment_id,
            }).then((savedcomment) => {
                return res.send({
                    result: true,
                    data: savedcomment,
                });
            });
        });
    },

    updateComment: (req, res, next) => {
        const request = req.body;
        const id = request.id;

        Post.findById(id).exec((err, post) => {
            if (err) {
                res.send(err);
            }
            post.updatecomment({
                author: request.author,
                text: request.text,
                username: request.username,
                comment_id: request.comment_id,
            }).then((savedcomment) => {
                return res.send({
                    result: true,
                    data: savedcomment,
                });
            });
        });
    },

    removeComment: (req, res, next) => {
        const request = req.body;
        const id = request.id;

        Post.findById(id).exec((err, post) => {
            if (err) {
                res.send(err);
            }
            post.removecomment({
                comment_id: request.comment_id,
            }).then(() => {
                return res.send({
                    result: true,
                });
            });
        });
    },
};
