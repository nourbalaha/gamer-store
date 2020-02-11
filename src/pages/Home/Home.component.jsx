import React, { Component } from 'react'
 
import "./Home.style.scss"

// import gamingConsole from "../../assets/gaming-console.png"

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
                {/* <img className="image" src={gamingConsole} alt="gamingConsole" /> */}
                <div className="home-btn-container">
                    <button className="home-btn" onClick={this.handleLogin}>LOGIN</button>
                    <button className="home-btn" onClick={this.handleRegister} >REGISTER</button>
                </div>
            </div>
        )
    }
}
