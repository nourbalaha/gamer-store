import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../Navbar/Navbar.style.scss"

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <p>Game Store</p>
        <ul>
          <li>
            <Link to="/">view inventory</Link>
          </li>
          <li>
            <Link to="/">add item</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
