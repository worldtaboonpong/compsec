import React, { Component } from "react";
import axios from "axios";
let $this;
class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      name: "",
    };
    $this = this;
  }

  componentDidMount(){
    setTimeout(function(){
        axios.get("http://localhost:5000/api/auth/user").then((res) => {
            $this.props.history.push("/home");
            console.log(res.data);
        })
    }, 1500)
}

  handleNameChange(e) {
    $this.setState({
      name: e.target.value,
    });
  }
  handleEmailChange(e) {
    $this.setState({
      email: e.target.value,
    });
  }
  handlePasswordChange(e) {
    $this.setState({
      password: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: $this.state.email,
      password: $this.state.password,
      name: $this.state.name,
    };
    axios.post("http://localhost:5000/api/user", user).then((res) => {
      $this.props.history.push("/login");
    });
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              onChange={this.handleNameChange}
              type="text"
              className="form-control"
              id="exampleInputName"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.handleEmailChange}
              type="email"
              className="form-control"
              id="exampleInputEmail"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={this.handlePasswordChange}
              type="password"
              className="form-control"
              id="exampleInputPassword"
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

export default Register;
