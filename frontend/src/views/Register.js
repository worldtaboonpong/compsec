import React, { Component } from "react";
import axios from "axios";
let $this;

function emailIsValid(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const formValid = (formErrors) => {
  let valid = true;
  Object.values(formErrors).forEach((val) => {
    if (val.length > 0) valid = false;
  });
  return valid;
};

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confirmedpassword: "",
      username: "",
      formErrors: {
        username: "",
        email: "",
        password: "",
        confirmedpassword: "",
      },
    };
    $this = this;
  }

  componentDidMount() {
    setTimeout(function () {
      axios.get("http://localhost:5000/api/auth/user").then((res) => {
        $this.props.history.push("/");
        console.log(res.data);
      });
    });
  }

  handleNameChange(e) {
    e.preventDefault();
    let formErrors = $this.state.formErrors;
    formErrors.username =
      e.target.value.length < 6 && e.target.value.length > 0
        ? "Minimum 6 characters required"
        : "";
    $this.setState({
      formErrors,
      username: e.target.value,
    });
  }
  handleEmailChange(e) {
    e.preventDefault();
    let formErrors = $this.state.formErrors;
    formErrors.email =
      emailIsValid(e.target.value) && e.target.value.length > 0
        ? ""
        : "Invalid email address";
    $this.setState({
      formErrors,
      email: e.target.value,
    });
  }
  handlePasswordChange(e) {
    e.preventDefault();
    let formErrors = $this.state.formErrors;
    let validation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    formErrors.password =
      e.target.value.match(validation) == null
        ? "Password needs to be between 8 to 15 characters and contains at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
        : "";
    $this.setState({
      formErrors,
      password: e.target.value,
    });
  }
  handleConfirmPasswordChange(e) {
    e.preventDefault();
    let formErrors = $this.state.formErrors;
    formErrors.confirmedpassword =
      e.target.value !== $this.state.password
        ? "You need to confirm the same password"
        : "";
    $this.setState({
      formErrors,
      confirmedpassword: e.target.value,
    });
  }

  handleSubmit(e) {
    if (formValid($this.state.formErrors)) {
      e.preventDefault();
      const user = {
        email: $this.state.email,
        password: $this.state.password,
        username: $this.state.username,
      };
      axios.post("http://localhost:5000/api/user", user).then((res) => {
        $this.props.history.push("/login");
      });
    } else {
      alert("Please fill the form correctly");
    }
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              onChange={this.handleNameChange}
              type="text"
              className="form-control"
              id="exampleInputName"
            />
          </div>
          <div className="errorMessage">{$this.state.formErrors.username}</div>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.handleEmailChange}
              type="email"
              className="form-control"
              id="exampleInputEmail"
            />
          </div>
          <div className="errorMessage">{$this.state.formErrors.email}</div>
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={this.handlePasswordChange}
              type="password"
              className="form-control"
              id="exampleInputPassword"
            />
          </div>
          <div className="errorMessage">{$this.state.formErrors.password}</div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              onChange={this.handleConfirmPasswordChange}
              type="password"
              className="form-control"
              id="exampleInputCOnfrimPassword"
            />
          </div>
          <div className="errorMessage">{$this.state.formErrors.confirmedpassword}</div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
