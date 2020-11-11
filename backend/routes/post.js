const postcontroller = require("./../controllers/PostController");

module.exports = (router) => {
    router.route("/post/:id").get(postcontroller.getPost);
    router.route("/post").post(postcontroller.addPost);
    router.route("/posts").get(postcontroller.getAllPosts);
    router.route("/deletePost").post(postcontroller.removePost);
    router.route("/savecomment").post(postcontroller.saveComment);
    router.route("/updatecomment").post(postcontroller.updateComment);
    router.route("/removecomment").post(postcontroller.removeComment);

};
