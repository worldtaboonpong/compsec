import React, { Component } from "react";
import axios from "axios";
let $this;

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      author:''
    };

    $this = this;
  }
  componentDidMount() {
    setTimeout(function () {
      axios
        .get("http://localhost/api/auth/user")
        .then((res) => {
            $this.setState({
                author : res.data.id
            })
          console.log(res.data);
        })
        .catch((err) => {
          $this.props.history.push("/login");
        });
    });
  }

  handleTitleChange(e) {
    e.preventDefault();
    $this.setState({
      title: e.target.value,
    });
  }

  handleDescriptionChange(e) {
    e.preventDefault();
    $this.setState({
      description: e.target.value,
    });
  }

  savePost(e) {
    e.preventDefault();
    const post = {
      title: $this.state.title,
      description: $this.state.description,
      author: $this.state.author
    };
    axios
      .post("http://localhost/api/post", post)
      .then((res) => {
        $this.props.history.push("/post");
      })
      .catch((err) => {
        alert("Something wrong");
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <h1>Create Post</h1>
        <form onSubmit={this.savePost}>
          <div className="form-group">
            <label>Title</label>
            <input
              onChange={this.handleTitleChange}
              type="text"
              className="form-control"
              id="exampleInputTitle"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              onChange={this.handleDescriptionChange}
              type="text"
              className="form-control"
              id="exampleInputDescription"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default CreatePost;
