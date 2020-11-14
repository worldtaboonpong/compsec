import React, { Component } from "react";
import axios from "axios";
import axioApi from './../axioConfig'
let $this;
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
    $this = this;
  }
  componentDidMount(){
    setTimeout(function(){
        axios.get("http://localhost:5000/api/auth/user").then((res) => {
            $this.props.history.push("/");
            console.log(res.data);
        })
    }, )
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
  saveRegister(e) {
    e.preventDefault();
    const user = {
      email: $this.state.email,
      password: $this.state.password,
    };
    axios.post("http://localhost:5000/api/auth/login", user).then((res) => {
      

      if(res.data.auth === true){
          localStorage.setItem('token', res.data.token);
          axios.defaults.headers.common['x-access-token'] = res.data.token;
        
        //   $this.props.history.push("/");
        $this.props.history.push({
            pathname : '/',
            redirectfrom: 'login'

        })

      }
    }).catch((err) => {
      if (err.response.data.message) {
        alert(err.response.data.message)
      } else if (err.response.status==429){
        alert("Reach Maximum, please retry in next 15 minutes")
      } else {
        alert("Something Wrong")
      }
        console.log(err.response);
        
    })
  }
  render() {
    return (
      <div>
        <br />
        <h1>Login</h1>
        <br />
        <form onSubmit={this.saveRegister}>
          <div className="form-group">
            <label>Email</label>
            <input
              onChange={this.handleEmailChange}
              type="email"
              className="form-control"
              id="email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              onChange={this.handlePasswordChange}
              type="password"
              className="form-control"
              id="password"
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

export default Login;
