import React, { Component } from "react";

import "./Item.style.scss";

export default class Item extends Component {
  render() {
    const { id, name, price, image, quantity, platform } = this.props;
    return (
      <div className="item">
        <img className="item-image" src={image} alt={name} />
        <span className="item-name">{name}</span>
        <span className="item-price">{price}$</span>
        <span className="item-platform">{platform}</span>
      </div>
    );
  }
}
