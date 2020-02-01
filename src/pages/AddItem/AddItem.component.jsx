import React, { Component } from "react";
import { connect } from "react-redux";

import { addItem } from "../../redux/inventory/inventory.actions"
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

  componentDidMount(){
    if(!this.props.admin){
      this.props.history.push("/inventory")
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    
    const newItem = this.state;
    newItem.name = newItem.name.toLowerCase();
    if(!this.state.image) newItem.image=GameCover;
    newItem.price=Number(newItem.price)
    newItem.quantity=Number(newItem.quantity)

    await this.props.addItem(newItem)
    
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
            name="name"
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
            required
            />

          <select
              className="list"
              name="platform"
              value={this.state.platform}
              placeholder="Platform"
              onChange={this.handleChange}
              required
            >
              <option value="">--Please choose a platform--</option>
              <option value="Playstation 4">Playstation 4</option>
              <option value="Xbox One">Xbox One</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
            </select>

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
  return { 
    inventory: state.inventory.inventory,
    admin: state.admin.admin,
  };
}

function mapDispatch(dispatch) {
  return {
    addItem(payload) {
      dispatch(addItem(payload));
    },
  };
}

export default connect(mapState, mapDispatch)(AddItem);
