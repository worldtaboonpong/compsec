import React, { Component } from "react";
import axios from "axios";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
let $this;

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
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
          console.log(res.data);
        })
        .catch((err) => {
          $this.props.history.push("/login");
        });
    });
  }
  render() {
    return (
      <div>
        <h1>Post</h1>
        <Link to = '/create-post'>
          <button className="btn btn-default">Create Post</button>
        </Link>
      </div>
    );
  }
}

export default Post;
