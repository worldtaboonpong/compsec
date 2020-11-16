import React, { Component } from "react";
import axios from "axios";
import axioApi from "./../axioConfig";
import { Header, Container} from 'semantic-ui-react'

let token = localStorage.getItem("token");

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
      axios.get("/api/auth/user").then((res) => {
        // console.log(res.data.username);
        // console.log(localStorage.getItem("token"))
      });
    }, );
  }

  render() {
    return (
      <Container text textAlign='center'>
    <Header
      as='h1'
      content='Welcome'
      style={{
        fontSize: '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: '3em',
      }}
    />
    <Header
      as='h2'
      content= {token? 'Enjoy!' : 'Please Login'}
      style={{
        fontSize: '1.7em',
        fontWeight: 'normal',
        marginBottom: '1em',
      }}
    />
  </Container>
    );
  }
}

export default Home;
