import React, { Component } from "react";
import asioApi from "./../axiosConfig";

class Register extends Component {
  render() {
    return (
      <div>
        <h1>Register</h1>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" id="exampleInputName" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" id="exampleInputEmail" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">
            Submit 
        </button>
      </div>
    );
  }
}

export default Register;
