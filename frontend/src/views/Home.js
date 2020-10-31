import React, {Component} from 'react';
import axios from 'axios'
import axioApi from './../axioConfig'


class Home extends Component {
    componentDidMount(){
        setTimeout(function(){
            axios.get("http://localhost:5000/api/auth/user").then((res) => {
                console.log(res.data);
            })
        }, 1500)
    }
    render() {
        return (
            <div>
                <h1>
                    Home 
                </h1>
            </div>
        )
    }
}

export default Home;