import React, { Component, useState } from "react";
import axios from "axios";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import {
  Button,
  Card,
  Image,
  Comment,
  Form,
  Header,
  Divider,
  Grid,
} from "semantic-ui-react";
import postAvatar from "./../steve.jpg";
import commentAvatar from "./../matt.jpg";

let $this;

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      user: [],
      role: [],
      author: "",
    };

    $this = this;
  }
  componentDidMount() {
    axios.get("http://localhost:5000/api/posts").then((res) => {
      $this.setState({
        posts: res.data,
      });
    });

    setTimeout(function () {
      axios
        .get("http://localhost:5000/api/auth/user")
        .then((res) => {
          $this.setState({
            user: res.data.username,
            role: res.data.role,
            author: res.data.id,
          });
          console.log(res.data);
        })
        .catch((err) => {
          $this.props.history.push("/login");
        });
    });
  }

  showPost() {
    return $this.state.posts.map(function (post) {
      console.log(post);
      return (
        <PostItem
          post={post}
          user={$this.state.user}
          role={$this.state.role}
          author={$this.state.author}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Post</h1>
        <Link to="/create-post">
          {/* <button className="btn btn-default">Create Post</button> */}
          <Button color="blue">Create Post</Button>
        </Link>
        <div>{this.showPost()}</div>
      </div>
    );
  }
}

class PostItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      isShowEditField: false,
      textBeforeEdit: "",
      commentId: "",
    };

    this.handleCommentChange = this.handleCommentChange.bind(this);
  }

  showEdit() {
    let editButton;
    if (
      this.props.post.author.username == this.props.user ||
      this.props.role === 1
    ) {
      editButton = (
        <Link to={"/editPost" + this.props.post._id}>
          <Button color="blue">Edit</Button>
        </Link>
      );
    }
    return editButton;
  }

  handleCommentChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  delete(id) {
    axios
      .post("http://localhost:5000/api/deletePost", { _id: id })
      .then((res) => {
        console.log(res.data);
        $this.props.history.push("/post");
      })
      .catch((err) => {
        alert("error", err);
      });
  }

  showDelete() {
    let deleteButton;
    if (
      this.props.post.author.username == this.props.user ||
      this.props.role === 1
    ) {
      deleteButton = (
        <a href="" onClick={() => this.delete(this.props.post._id)}>
          <Button color="red">Delete</Button>
        </a>
      );
    }
    return deleteButton;
  }

  showComment() {
    const user = this.props.user;
    const role = this.props.role;
    const author = this.props.author;
    const postid = this.props.post._id;

    const setIsShowEditField = (commentText, commentId) => {
      this.setState({
        isShowEditField: true,
        text: commentText,
        commentId: commentId,
      });
    };

    const handleCommentChange = (e) => {
      e.preventDefault();
      this.setState({
        text: e.target.value,
      });
      console.log("change comment");
    };

    const text = this.state.text;

    const isShowEditField = this.state.isShowEditField;
    const commentId = this.state.commentId;

    const updateComment = (commentid) => {
      console.log("update!");

      axios
        .post("http://localhost:5000/api/updatecomment", {
          id: postid,
          author: author,
          text: text,
          username: user,
          comment_id: commentid,
        })
        .then((res) => {
          window.location.reload();
        });
    };

    const setHideEditField = () => {
      this.setState({
        isShowEditField: false,
      });
      console.log("clicked cancel");
    };

    const deleteComment = (commentId) => {
      axios
      .post("http://localhost:5000/api/deletecomment", {
        id: postid,
        comment_id: commentId,
      })
      .then((res) => {
        window.location.reload();
      });
    }
      
    

    if (this.props.post.comments instanceof Array) {
      return this.props.post.comments.map(function (comment, i) {
        return (
          <div key={i}>
            {/* <p>
              {comment.text} by {comment.username}
              {comment.username === user || role === 1 ? (
                <div>
                  <button>Edit</button>
                </div>
              ) : (
                <div></div>
              )}
            </p> */}
            <Comment.Group minimal>
              <Comment>
                <Comment.Content>
                  <Grid>
                    <Grid.Column>
                      <Comment.Avatar
                        as="a"
                        src={commentAvatar}
                        verticalAlign="middle"
                      />
                    </Grid.Column>
                    <Grid.Column width={13}>
                      <Comment.Author as="a">
                        By {comment.username}
                      </Comment.Author>
                      <Comment.Text>
                        {isShowEditField === true &&
                        comment.username === user &&
                        comment._id === commentId ? (
                          <div>
                            <input
                              value={text}
                              onChange={handleCommentChange}
                              type="text"
                            />
                            <Button onClick={() => updateComment(comment._id)}>
                              Save
                            </Button>
                            <Button onClick={() => setHideEditField()}>
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <div>{comment.text}</div>
                        )}
                      </Comment.Text>
                    </Grid.Column>
                    <Grid.Column width={1}>
                      {comment.username === user || role === 1 ? (
                        <div>
                          <Button
                            floated="right"
                            onClick={() =>
                              setIsShowEditField(comment.text, comment._id)
                            }
                          >
                            Edit
                          </Button>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Grid.Column>
                    <Grid.Column width={1}>
                      {comment.username === user || role === 1 ? (
                        <div>
                          <Button
                            floated="right"
                            onClick={() =>
                              deleteComment(comment._id)
                            }
                          >
                            Delete
                          </Button>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </Grid.Column>
                  </Grid>
                </Comment.Content>
              </Comment>
            </Comment.Group>

            {/* {this.showEditComment(comment.username)}
            {() => {
              this.showDeleteComment(comment.username);
            }} */}
          </div>
        );
      });
    }
  }

  saveComment(id, author, username) {
    axios
      .post("http://localhost:5000/api/savecomment", {
        id: id,
        author: author,
        text: this.state.text,
        username: username,
      })
      .then((res) => {
        document.getElementById("comment").value = "";
        this.setState({
          text: "",
        });
        window.location.reload();
        console.log(username);
      });
  }

  showCommentBox() {
    if (this.props.author != "") {
      return (
        <div>
          <textarea
            id="comment"
            placeholder="Comment Here"
            className="form-control"
            onChange={this.handleCommentChange}
          ></textarea>
          <button
            className="btn"
            onClick={() => {
              this.saveComment(
                this.props.post._id,
                this.props.author,
                this.props.user
              );
            }}
          >
            Save
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {/* <div>
          <h1>Title</h1>
          <p>{this.props.post.title}</p>
          <h1>Description</h1>
          <p>{this.props.post.description}</p>
          <h1>By</h1>
          <p>{this.props.post.author.username}</p>
          {this.showEdit()}
          {this.showDelete()}
        </div> */}
        <Card.Group>
          <Card fluid color="blue">
            <Card.Content>
              <Grid>
                <Grid.Column width={2}>
                  <Image floated="left" size="small" src={postAvatar} inline />
                </Grid.Column>
                <Grid.Column width={6}>
                  <Card.Header>
                    By {this.props.post.author.username}
                  </Card.Header>
                  <Card.Meta>
                    <b>{this.props.post.title}</b>
                  </Card.Meta>
                  <Card.Meta>{this.props.post.description}</Card.Meta>
                </Grid.Column>
              </Grid>
            </Card.Content>
            <Card.Content extra>
              <Card.Meta>{this.showComment()}</Card.Meta>
              <Card.Meta>{this.showCommentBox()}</Card.Meta>
              <Card.Description>
                {this.showEdit()} {this.showDelete()}
              </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      </div>
    );
  }
}

export default Post;
