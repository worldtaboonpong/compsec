const postcontroller = require("./../controllers/PostController");
var JwtAuthMiddleware = require("./../middewares/JwtAuthMiddleware");
module.exports = (router) => {
    router.route("/post/:id").get(JwtAuthMiddleware, postcontroller.getPost);
    router.route("/post").post(JwtAuthMiddleware, postcontroller.addPost);
    router.route("/posts").get(JwtAuthMiddleware, postcontroller.getAllPosts);
    router
        .route("/deletePost")
        .post(JwtAuthMiddleware, postcontroller.removePost);
    router
        .route("/savecomment")
        .post(JwtAuthMiddleware, postcontroller.saveComment);
    router.route("/updatecomment").post(postcontroller.updateComment);
    router.route("/removecomment").post(postcontroller.removeComment);
};
