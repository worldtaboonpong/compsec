import "./App.css";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import Home from "./views/Home.js";
import Register from "./views/Register.js";
import Login from './views/Login.js';

function App() {
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
              <li className="nav-item ">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item ">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
      <div className="container">Footer</div>
    </div>
  );
}

export default App;
