const postcontroller = require("./../controllers/PostController");

module.exports = (router) => {
  router.route("/post/:id").get(postcontroller.getPost);
  router.route("/post").post(postcontroller.addPost);
  router.route("/posts").get(postcontroller.getAllPosts);
  router.route("/savecomment").post(postcontroller.saveComment);

};