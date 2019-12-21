import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import logo from "../../assets/Logo white.png"

import "../Navbar/Navbar.style.scss"

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <img className="logo" src={logo} alt="logo" onClick={()=>this.props.history.push("/")}/>
        <ul>
          <li>
            <span className="nav-item" onClick={()=>this.props.history.push("/")}>INVENTORY</span>
          </li>
          <li>
            <span className="nav-item" onClick={()=>this.props.history.push("/")}>ADD ITEM</span>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withRouter(Navbar);