import React, { Component } from "react";
import { connect } from "react-redux";

import "./SelectedItem.style.scss";

class SelectedItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true,
      id: "",
      name: "",
      price: "",
      platform: "",
      quantity: "",
      image: ""
    };
  }

  componentDidMount() {
    const id = Number(this.props.match.params.id);
    const currentItem = this.props.inventory.filter(
      item => Number(item.id) === id
    )[0];
    this.setState({
      id,
      name: currentItem.name,
      price: currentItem.price,
      platform: currentItem.platform,
      quantity: currentItem.quantity,
      image: currentItem.image
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpdate = () => {
    this.setState((prevState, prevProps) => {
      return { disabled: !prevState.disabled };
    });
    if (!this.state.disabled) {
      this.props.onUpdateClick({
        id: this.state.id,
        name: this.state.name.toLocaleLowerCase(),
        price: this.state.price,
        platform: this.state.platform,
        quantity: this.state.quantity,
        image: this.state.image
      });
      this.props.history.push("/inventory");
    }
  };

  handleDelete = () => {
    this.props.onDeleteClick({ id: this.state.id });
    this.props.history.push("/inventory");
  };

  handleInc = () => {
    this.setState((prevState, prevProps) => {
      return {
        quantity: prevState.quantity + 1
      };
    });
  };

  handleDec = () => {
    if (this.state.quantity > 0) {
      this.setState((prevState, prevProps) => {
        return {
          quantity: prevState.quantity - 1
        };
      });
    }
  };

  handleAddToCart = () => {
    const item = {};
    item.id = this.state.id;
    item.name = this.state.name;
    item.price = this.state.price;
    item.platform = this.state.platform;
    item.image = this.state.image;
    this.props.onAddToCartClick(item)
  };

  render() {
    return (
      <div className="selected-item">
        <div className="wrapper">
          <img
            className="item-image"
            src={this.state.image}
            alt={this.state.name}
          />
          <div className="details">
            <input
              name="name"
              type="text"
              className="item-name input"
              value={this.state.name}
              onChange={this.handleChange}
              disabled={this.state.disabled}
            />
            <input
              name="price"
              type="text"
              className="item-price input"
              value={
                this.state.disabled
                  ? `${this.state.price}$`
                  : `${this.state.price}`
              }
              onChange={this.handleChange}
              disabled={this.state.disabled}
            />

            <select
              className="input"
              name="platform"
              value={this.state.platform}
              onChange={this.handleChange}
              disabled={this.state.disabled}
            >
              <option value="Playstation 4">Playstation 4</option>
              <option value="Xbox One">Xbox One</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
            </select>

            <div className="quantity-container">
              <input
                className="btn plus-minus"
                type="button"
                value="-"
                onClick={this.handleDec}
                disabled={this.state.disabled}
              />
              <span>
                {this.state.quantity}
              </span>
              <input
                className="btn plus-minus"
                type="button"
                value="+"
                onClick={this.handleInc}
                disabled={this.state.disabled}
              />
            </div>
            <input
              className="btn update"
              type="button"
              value="Update item"
              onClick={this.handleUpdate}
            />
            <input
              className="btn delete"
              type="button"
              value="Delete item"
              onClick={this.handleDelete}
            />

            <input
              className="btn add-to-cart"
              type="button"
              value="Add to cart"
              onClick={this.handleAddToCart}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    inventory: state.inventory.inventory
  };
}

function mapDispatch(dispatch) {
  return {
    onUpdateClick(payload) {
      dispatch({ type: "UPDATE_ITEM", payload });
    },
    onDeleteClick(payload) {
      dispatch({ type: "DELETE_ITEM", payload });
    },
    onAddToCartClick(payload) {
      dispatch({ type: "ADD_TO_CART", payload });
    },
  };
}

export default connect(mapState, mapDispatch)(SelectedItem);
