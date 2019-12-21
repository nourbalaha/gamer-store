import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./Item.style.scss";

class Item extends Component {
  render() {
    const { id, name, price, image, platform } = this.props;
    return (
      <div onClick={()=>this.props.history.push(`/inventory/${id}`)} className="item">
        <img className="item-image" src={image} alt={name} />
        <span className="item-name">{name}</span>
        <span className="item-platform">{platform}</span>
        <span className="item-price">{price}$</span>
      </div>
    );
  }
}

export default withRouter(Item);
