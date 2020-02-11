import React, { Component } from 'react'
 
import "./Home.style.scss"

export default class Home extends Component {
    handleLogin=()=>{
        this.props.history.push("/signin")
    }
    handleRegister=()=>{
        this.props.history.push("/register")
    }
    render() {
        return (
            <div className="home-page">
                <div className="home-btn-container">
                    <button className="home-btn" onClick={this.handleLogin}>LOGIN</button>
                    <button className="home-btn" onClick={this.handleRegister} >REGISTER</button>
                </div>
            </div>
        )
    }
}
