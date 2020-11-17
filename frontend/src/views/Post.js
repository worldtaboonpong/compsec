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
  Input,
  Icon
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
    axios.get("/api/posts").then((res) => {
      $this.setState({
        posts: res.data,
      });
    });

    setTimeout(function () {
      axios
        .get("/api/auth/user")
        .then((res) => {
          $this.setState({
            user: res.data.username,
            role: res.data.role,
            author: res.data.id,
          });
        })
        .catch((err) => {
          $this.props.history.push("/login");
        });
    });
  }

  showPost() {
    return $this.state.posts.map(function (post) {
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
          <Button style = {{margin: "0px 0px 10px 0px"}} color="blue">Create Post</Button>
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
          <Button color="blue">Edit Post</Button>
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
      .post("/api/deletePost", { _id: id })
      .then((res) => {
        window.location.reload();
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
          <Button color="red" onClick={() => this.delete(this.props.post._id)}>Delete</Button>
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
      // console.log("change comment");
    };

    const text = this.state.text;

    const isShowEditField = this.state.isShowEditField;
    const commentId = this.state.commentId;

    const updateComment = (commentid) => {
      // console.log("update!");

      axios
        .post("/api/updatecomment", {
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
      // console.log("clicked cancel");
    };

    const deleteComment = (commentId) => {
      axios
      .post("/api/removecomment", {
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
            <Comment.Group>
              <Comment 
              style = {{margin: "0px 0px 14px 0px"}}
              >
                <Comment.Avatar
                  as="a"
                  src={commentAvatar}
                  verticalAlign="middle"
                />
                <Comment.Content>
                <Comment.Author as="a">By {comment.username}</Comment.Author>
                <Comment.Text>
                  {isShowEditField === true &&
                  comment.username === user &&
                  comment._id === commentId ? (
                    <div>
                      <Input
                        fluid 
                        value={text}
                        onChange={handleCommentChange}
                        type="text"
                      >
                        <input />
                      <Button onClick={() => updateComment(comment._id)}>
                        Save
                      </Button>
                      <Button onClick={() => setHideEditField()}>
                        Cancel
                      </Button>
                      </Input>
                    </div>
                  ) : (
                    <div>{comment.text}</div>
                  )}            
                </Comment.Text>
                <Comment.Actions>
                {(comment.username === user || role === 1) ? 
                    <div>
                      <Comment.Action onClick={() => setIsShowEditField(comment.text, comment._id)}>Edit</Comment.Action>
                      <Comment.Action onClick={() => deleteComment(comment._id)}>Delete</Comment.Action>
                    </div>
                         : null }
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </div>
        );
      });
    }
  }

  saveComment(id, author, username) {
    axios
      .post("/api/savecomment", {
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
            style = {{margin: "0px 0px 9px 0px"}}
          ></textarea>
          <Button 
            compact
            onClick={() => {
              this.saveComment(
                this.props.post._id,
                this.props.author,
                this.props.user
              );
            }}
          >
            Add a comment
            <Icon name='angle right'/>
          </Button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
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
