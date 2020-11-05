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

  showPost() {
    return $this.state.posts.map(function (post, i) {
      console.log(post);
      return <PostItem post={post} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h1>Post</h1>
        <Link to="/create-post">
          <button className="btn btn-default">Create Post</button>
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

  showName(){
      console.log(this.props.post.author)
    //   return this.props.post.author.map(function(author){
    //       return (
    //           <p>
    //               {author.name}
    //           </p>
    //       )
    //   })
      
  }
  render() {
    return (
      <div>
        <div>
          <h1>Title</h1>
          <p>{this.props.post.title}</p>
          <h1>Description</h1>
          <p>{this.props.post.description}</p>
          <h1>By</h1>
         
            {this.showName()}
          
        </div>
      </div>
    );
  }
}

export default Post;
