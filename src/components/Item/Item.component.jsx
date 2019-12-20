import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Item.style.scss";

export default class Item extends Component {
  render() {
    const { id, name, price, image, quantity, platform } = this.props;
    return (
      <Link to={`/${id}`} className="item">
        <img className="item-image" src={image} alt={name} />
        <span className="item-name">{name}</span>
        <span className="item-price">{price}$</span>
        <span className="item-platform">{platform}</span>
      </Link>
    );
  }
}
