import React, { Component } from "react";
import { connect } from "react-redux";

import "./AddItem.style.scss";

import GameCover from "../../assets/Game Cover Placeholder.jpg"

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      platform: "",
      price: "",
      image: "",
      quantity: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const newItem = this.state;
    if(!this.state.image) newItem.image=GameCover;
    newItem.id=Number(newItem.id)
    newItem.price=Number(newItem.price)
    newItem.quantity=Number(newItem.quantity)
    this.props.onAddClick(newItem)
    this.props.history.push("/inventory")
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="add-item">
        <form className="add-item-form" onSubmit={this.handleSubmit}>
          <span className="title">Add Item</span>
          <input
            className="input"
            name="id"
            type="text"
            placeholder="ID"
            value={this.state.id}
            onChange={this.handleChange}
            required
          />

          <input
            className="input"
            name="name"
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />

          <input
            className="input"
            name="platform"
            type="text"
            placeholder="Platform"
            value={this.state.platform}
            onChange={this.handleChange}
            required
          />

          <input
            className="input"
            name="price"
            type="text"
            placeholder="Price"
            value={this.state.price}
            onChange={this.handleChange}
            required
          />

            <input
            className="input"
            name="image"
            type="text"
            placeholder="Image Url"
            value={this.state.image}
            onChange={this.handleChange}
            />

          <input
            className="input"
            name="quantity"
            type="text"
            placeholder="Quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />

          <input className="btn" type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

function mapState(state) {
  return { inventory: state.inventory };
}

function mapDispatch(dispatch) {
  return {
    onAddClick(payload) {
      dispatch({ type: "ADD_ITEM", payload });
    }
  };
}

export default connect(mapState, mapDispatch)(AddItem);
