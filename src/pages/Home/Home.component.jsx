import React, { Component } from 'react'
 
import "./Home.style.scss"

import gamingConsole from "../../assets/gaming-console.png"

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
                <img className="image" src={gamingConsole} alt="gamingConsole" />
                <div className="home-btn-container">
                    <input className="home-btn" type="button" value="LOGIN" onClick={this.handleLogin} />
                    <input className="home-btn" type="button" value="REGISTER" onClick={this.handleRegister} />
                </div>
            </div>
        )
    }
}
