import React, { Component } from "react";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <p>Game Store</p>
        <ul>
          <li>
            <a href="#">view inventory</a>
          </li>
          <li>
            <a href="#">add item</a>
          </li>
        </ul>
      </nav>
    );
  }
}
