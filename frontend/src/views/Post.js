import React, {Component} from 'react';
import axios from 'axios'
let $this;

class Post extends Component {
    constructor(props) {
        super(props);
    

        $this = this;
      }
    componentDidMount(){
        setTimeout(function(){
            axios.get("http://localhost:5000/api/auth/user").then((res) => {
                console.log(res.data);
            }).catch((err) => {
                $this.props.history.push("/login");
            });
        }, )
    }
    render() {
        return (
            <div>
                <h1>
                    Post
                </h1>
            </div>
        )
    }
}

export default Post;