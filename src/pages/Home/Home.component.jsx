import React, { Component } from 'react'
 
import "./Home.style.scss"

import gamingConsole from "../../assets/gaming-console.png"

export default class Home extends Component {
    handleClick=()=>{
        this.props.history.push("/inventory")
    }
    render() {
        return (
            <div className="home-page">
                <img className="image" src={gamingConsole} alt="gamingConsole" />
                <input className="button" type="button" value="View Inventory" onClick={this.handleClick} />
            </div>
        )
    }
}
