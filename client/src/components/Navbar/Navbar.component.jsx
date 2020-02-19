import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Assets
import logo from "../../assets/Logo white.png";
// Styles
import "../Navbar/Navbar.style.scss";
// Components
import Dropdown from "../../components/Dropdown/Dropdown.component";
import CartIcon from "../../components/CartIcon/CartIcon.component";
import SearchBar from "../../components/SearchBar/SearchBar.component";

const Navbar = ({ history, currentUser, admin }) => {

  return (
    <nav className="navbar">
      <img
        className="logo"
        src={logo}
        alt="logo"
        onClick={() => history.push("/")}
      />
      {
        currentUser && <SearchBar />
      }
      <ul>
        <li>
          {
          currentUser
          &&
          (<span
            className="nav-item"
            onClick={() => history.push("/inventory")}
          >
            INVENTORY
          </span>)
          }
        </li>
        <li>
          { (currentUser&&admin)
          &&
          (<span
            className="nav-item"
            onClick={() => history.push("/additem")}
          >
            ADD ITEM
          </span>)
          }
        </li>
        <li>
          {currentUser && <Dropdown />}
        </li>
        <li>
          {(currentUser&&!admin) && <CartIcon />}
        </li>
      </ul>
    </nav>
  );
}

function mapState(state) {
  return { 
    currentUser: state.auth.currentUser,
    admin: state.admin.admin,
   };
}

export default compose(withRouter, connect(mapState))(Navbar);
