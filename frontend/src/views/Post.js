import React, { Component } from "react";
import axios from "axios";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import { Button, Card, Image, Comment, Form, Header } from "semantic-ui-react";

let $this;

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            user: [],
            role: [],
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
                    });
                    console.log(res.data);
                })
                .catch((err) => {
                    $this.props.history.push("/login");
                });
        });
    }

    showPost() {
        return $this.state.posts.map(function (post, i) {
            console.log(post);
            return (
                <PostItem
                    post={post}
                    key={i}
                    user={$this.state.user}
                    role={$this.state.role}
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
    }

    showEdit() {
        let editButton;
        if (
            this.props.post.author.username == this.props.user ||
            this.props.role === 1
        ) {
            editButton = (
                <Link to={"/editPost" + this.props.post._id}>
                    <a className="nav-link" href="">
                        Edit
                    </a>
                </Link>
            );
        }
        return editButton;
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
                <a
                    className="nav-link"
                    href=""
                    onClick={() => this.delete(this.props.post._id)}
                >
                    Delete
                </a>
            );
        }
        return deleteButton;
    }

    showName() {
        console.log(this.props.post.author);
        return this.props.post.author.map(function (author) {
            return <p>{author.name}</p>;
        });
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
                            <Image
                                floated="left"
                                size="small"
                                src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                            />
                            <Card.Header>By</Card.Header>
                            <Card.Meta>
                                <b>{this.props.post.title}</b>
                            </Card.Meta>
                            <Card.Meta>{this.props.post.description}</Card.Meta>
                            <Card.Description>
                                {this.props.post.Description}
                            </Card.Description>
                        </Card.Content>
                    </Card>
                </Card.Group>
            </div>
        );
    }
}

export default Post;
