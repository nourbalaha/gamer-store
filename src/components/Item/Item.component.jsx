import React, { Component } from "react";

import "./Item.style.scss"

export default class Item extends Component {
  render() {
    return (
      <div className="item">
        <img className="item-image" src="https://images.freeimages.com/images/large-previews/fbd/bananas-with-honey-1639306.jpg" alt="bananas" />
        <span className="item-quantity">200 oz</span>
        <span className="item-name">Bananas</span>
      </div>
    );
  }
}
