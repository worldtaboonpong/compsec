import "./App.css";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import Home from "./views/Home.js";
import Register from "./views/Register.js";
import Login from "./views/Login.js";
import Post from "./views/Post.js";
import Admin from "./views/Admin.js"
import { render } from "react-dom";
import { Component } from "react";
import axios from 'axios'
import CreatePost from "./views/CreatePost";
let $this;

let token = localStorage.getItem("token");

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      role: "",
    };
    $this = this;
  }

  componentDidMount() {
    setTimeout(function () {
      axios.get("http://localhost:5000/api/auth/user").then((res) => {
        $this.setState({
          username: res.data.username,
          role: res.data.role,
        });
      });
    }, );
  }

  showName() {
    let showname
    if (token) {
      const username = $this.state.username;
      showname = <h1 className="nav-link">{username}</h1>;
    }
    return showname;
  }

  showLogin() {
    let loginorlogout = (
      <Link className="nav-link" to="/login">
        Login
      </Link>
    );
    if (token) {
      loginorlogout = (
        <a className="nav-link" href="" onClick={this.logout}>
          Logout
        </a>
      );
    }
    return loginorlogout;
  }
  logout() {
    localStorage.removeItem("token");
    this.history.push("/");
  }
  showRegisterorPost() {
    let registerorpost = (
      <Link className="nav-link" to="/register">
        Register
      </Link>
    );
    if (token) {
      registerorpost = (
        <Link className="nav-link" to="/post">
          Post
        </Link>
      );
    }
    return registerorpost;
  }

  render() {
    return (
      <div>
        <div className="header">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarSupportContent">
              <ul className="navbar-nav mr-auto container">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item ">{this.showRegisterorPost()}</li>
                <li className="nav-item ">{this.showLogin()}</li>
                <li className="nav-item">{this.showName()}</li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/post" component={Post} />
            <Route path="/admin" component={Admin} />
            <Route path="/create-post" component={CreatePost} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
