import "./App.css";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import Home from "./views/Home.js";
import Register from "./views/Register.js";
import Login from "./views/Login.js";
import Post from "./views/Post.js";
import Admin from "./views/Admin.js";
import { render } from "react-dom";
import { React, Component } from "react";
import axios from "axios";
import CreatePost from "./views/CreatePost";
import { Menu, Container, Button, Image, Header } from "semantic-ui-react";
import userImage from "./user.png";
import EditPost from "./views/EditPost";
import { ProtectedRoute } from "./protectedRoute";
import { WithoutLoginRoute } from "./withoutLoginRoute";
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
        });
    }

    showName() {
        let showname;
        if (token) {
            const username = $this.state.username;
            showname = (
                <Header as="h4" style={{ marginBottom: 0 }}>
                    <Image circular src={userImage} /> {username}
                </Header>
            );
        }
        return showname;
    }

    logout() {
        localStorage.removeItem("token");
        this.history.push("/");
    }

    render() {
        return (
            <div>
                <Container>
                    <Menu pointing secondary size="large">
                        <Menu.Item as="a" href="/" style={{ padding: 20 }}>
                            Home
                        </Menu.Item>
                        {token ? (
                            <Menu.Item
                                as="a"
                                href="/post"
                                style={{ padding: 20 }}
                            >
                                Post
                            </Menu.Item>
                        ) : null}
                        <Menu.Item position="right" style={{ padding: 10 }}>
                            {token ? null : (
                                <Button
                                    as="a"
                                    href="/register"
                                    style={{ margin: 0 }}
                                >
                                    {" "}
                                    Register{" "}
                                </Button>
                            )}
                            {this.showName()}
                            {token ? (
                                <Button
                                    as="a"
                                    href=""
                                    style={{ marginLeft: "1em" }}
                                    onClick={this.logout}
                                >
                                    Logout
                                </Button>
                            ) : (
                                <Button
                                    as="a"
                                    href="/login"
                                    style={{ marginLeft: "0.5em" }}
                                >
                                    Login
                                </Button>
                            )}
                        </Menu.Item>
                    </Menu>
                </Container>

                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <WithoutLoginRoute
                            path="/register"
                            component={Register}
                        />
                        <WithoutLoginRoute path="/login" component={Login} />
                        <ProtectedRoute path="/post" component={Post} />
                        <ProtectedRoute path="/admin" component={Admin} />
                        <ProtectedRoute
                            path="/create-post"
                            component={CreatePost}
                        />
                        <ProtectedRoute
                            path="/editPost:id"
                            component={EditPost}
                        />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
