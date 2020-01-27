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
            {
            this.props.currentUser
            &&
            (<span
              className="nav-item"
              onClick={() => this.props.history.push("/inventory")}
            >
              INVENTORY
            </span>)
            }
          </li>
          <li>
            { (this.props.currentUser&&this.props.admin)
            &&
            (<span
              className="nav-item"
              onClick={() => this.props.history.push("/additem")}
            >
              ADD ITEM
            </span>)
            }
          </li>
          <li>
            {this.props.currentUser && <Dropdown />}
          </li>
          <li>
            {(this.props.currentUser&&!this.props.admin) && <CartIcon />}
          </li>
        </ul>
      </nav>
    );
  }
}

function mapState(state) {
  return { 
    currentUser: state.auth.currentUser,
    admin: state.admin.admin,
   };
}

function mapDispatch(dispatch) {
  return {
    onAddUser(payload) {
      dispatch({ type: "ADD_USER", payload });
    }
  };
}

export default compose(withRouter, connect(mapState, mapDispatch))(Navbar);
