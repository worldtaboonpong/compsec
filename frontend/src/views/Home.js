import React, { Component } from "react";
import axios from "axios";
import axioApi from "./../axioConfig";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const redirectfrom = this.props.location.redirectfrom;
    if (redirectfrom == 'login'){
        window.location.reload();
    }
    setTimeout(function () {
      axios.get("http://localhost:5000/api/auth/user").then((res) => {
        console.log(res.data.username);
        console.log(localStorage.getItem("token"))
      });
    }, 1500);
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

export default Home;
