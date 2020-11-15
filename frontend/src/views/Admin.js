import React, { Component } from "react";
import axios from "axios";
let $this;

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
    };
    $this = this;
  }
  componentDidMount() {
    setTimeout(function () {
      axios.get("/api/auth/user").then((res) => {
        $this.setState({
            role: res.data.role
        })
        
      }).catch((err) => {
        $this.props.history.push("/login");
      });
    }, );
    console.log($this.state.role)
  }
  
  protectedRoute(){
      let adminAccess
      const role = $this.state.role;
      if (role !== 0){
        adminAccess = (
            <h1>Admin</h1>
        )
      } else {
        $this.props.history.push("/");
      }
      return adminAccess
  }

  render() {
    return (
      <div>
        {this.protectedRoute()}
      </div>
    );
  }
}

export default Admin;
