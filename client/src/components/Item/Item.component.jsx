import React from "react";
import { withRouter } from "react-router-dom";

import "./Item.style.scss";

const Item = ({ id, name, price, image, platform, history }) => {
  return (
    <div onClick={()=>history.push(`/inventory/${id}`)} className="item">
      <img className="item-image" src={image} alt={name} />
      <span className="item-name">{name}</span>
      <span className="item-platform">{platform}</span>
      <span className="item-price">{price}$</span>
    </div>
  );
}

export default withRouter(Item);
