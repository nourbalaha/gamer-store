import React, { Component } from "react";

import Item from "../Item/Item.component";

import inventory from "../../data/inventory";

import "../Inventory/Inventory.style.scss";

export default class Inventory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inventory,
      search: ""
    };
  }

  handleChange = event => {
    this.setState({ search: event.target.value });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="search-section">
            <div className="platforms">
                <span className="platform all">All Platforms</span>
                <span className="platform playstation">Playstation 4</span>
                <span className="platform xbox">Xbox One</span>
            </div>
          <input
            id="search"
            name="search"
            type="text"
            placeholder="search"
            value={this.state.search}
            onChange={this.handleChange}
          />
        </div>
        <div className="inventory">
          {this.state.search === ""
            ? this.state.inventory.map(item =>
                <Item
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                  image={item.image}
                  platform={item.platform}
                />
              )
            : this.state.inventory
                .filter(item => item.name.startsWith(this.state.search))
                .map(item =>
                  <Item
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    image={item.image}
                    platform={item.platform}
                  />
                )}
        </div>
      </div>
    );
  }
}
