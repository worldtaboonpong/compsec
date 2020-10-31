import "./App.css";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import Home from "./views/Home.js";
import Register from "./views/Register.js";
import Login from "./views/Login.js";
import Post from "./views/Post.js";
import { render } from "react-dom";
import { Component } from "react";

let token = localStorage.getItem("token");

class App extends Component {
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
          </Switch>
        </div>
        <div className="container">Footer</div>
      </div>
    );
  }
}

export default App;
