import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import logo from "../../assets/Logo white.png";

import "../Navbar/Navbar.style.scss";

import Dropdown from "../../components/Dropdown/Dropdown.component";
import CartIcon from "../../components/CartIcon/CartIcon.component";

class Navbar extends Component {
  handleSignIn = () => {
    this.props.history.push("/signin");
  };

  render() {
    let item;
    if (typeof this.props.currentUser == "object" && !this.props.currentUser) {
      item = (
        <span className="nav-item" onClick={this.handleSignIn}>
          LOGIN
        </span>
      );
    } else {
      item = (
        <Dropdown />
      );
    }
    return (
      <nav className="navbar">
        <img
          className="logo"
          src={logo}
          alt="logo"
          onClick={() => this.props.history.push("/")}
        />
        <ul>
          <li>
            <span
              className="nav-item"
              onClick={() => this.props.history.push("/inventory")}
            >
              INVENTORY
            </span>
          </li>
          <li>
            <span
              className="nav-item"
              onClick={() => this.props.history.push("/additem")}
            >
              ADD ITEM
            </span>
          </li>
          <li>
            {item}
          </li>
          <li>
            <CartIcon />
          </li>
        </ul>
      </nav>
    );
  }
}

function mapState(state) {
  return { currentUser: state.auth.currentUser };
}

function mapDispatch(dispatch) {
  return {
    onAddUser(payload) {
      dispatch({ type: "ADD_USER", payload });
    }
  };
}

export default compose(withRouter, connect(mapState, mapDispatch))(Navbar);
