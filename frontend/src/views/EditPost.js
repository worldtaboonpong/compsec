import React, { Component } from "react";
import axios from "axios";
let $this;

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: "",
            title: "",
            description: "",
        };

        $this = this;
    }
    componentDidMount() {
        $this.setState({
            _id: $this.props.match.params.id,
        });
        setTimeout(function () {
            axios
                .get(
                    "http://localhost:5000/api/post/" +
                        $this.props.match.params.id
                )
                .then((res) => {
                    $this.setState({
                        title: res.data.title,
                        description: res.data.description,
                    });
                    console.log(res.data);
                })
                .catch((err) => {
                    $this.props.history.push("/login");
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
            _id: $this.state._id,
            title: $this.state.title,
            description: $this.state.description,
        };
        axios
            .post("http://localhost:5000/api/post", post)
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
                <h1>Edit Post</h1>
                <form onSubmit={this.savePost}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            value={$this.state.title}
                            onChange={this.handleTitleChange}
                            type="text"
                            className="form-control"
                            id="exampleInputTitle"
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            value={$this.state.description}
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

export default EditPost;