import React, { Component } from "react";
import { connect } from "react-redux";

import { addItem } from "../../redux/cart/cart.actions"
import { updateItem, deleteItem } from "../../redux/inventory/inventory.actions"

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
    const id = this.props.match.params.id;
    const currentItem = this.props.inventory.filter(
      item => item.id === id
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
      const updatedItem = {
        id: this.state.id,
        name: this.state.name.toLocaleLowerCase(),
        price: this.state.price,
        platform: this.state.platform,
        quantity: this.state.quantity,
        image: this.state.image
      }

      this.props.updateItem(updatedItem)
      
      this.props.history.push("/inventory");
    }
  };
  
  handleDelete = () => {
    this.props.deleteItem(this.props.match.params.id)

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
    const newItem = {};
    newItem.id = this.state.id;
    newItem.name = this.state.name;
    newItem.price = this.state.price;
    newItem.platform = this.state.platform;
    newItem.image = this.state.image;

    this.props.addToCart(newItem)
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

            {this.props.admin
            ?
            (<select
              className="input"
              name="platform"
              value={this.state.platform}
              onChange={this.handleChange}
              disabled={this.state.disabled}
            >
              <option value="Playstation 4">Playstation 4</option>
              <option value="Xbox One">Xbox One</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
            </select>)
            :
            <p className="input">{this.state.platform}</p>
            }

            {this.props.admin
            ?
            (<div className="quantity-container">
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
            </div>)
            :
            ""
            }
            {this.props.admin
            ?
            (<button
              className="btn update"
              onClick={this.handleUpdate}
            ><i className="fa fa-pencil" /> Update item</button>)
          :
          ""
          }
            {this.props.admin?
            (<button
              className="btn delete"
              onClick={this.handleDelete}
            ><i className="fa fa-trash" /> Delete item</button>)
          :
          ""
          }

            {!this.props.admin
            ?
            (<button
              className="btn add-to-cart"
              onClick={this.handleAddToCart}
            ><i className="fa fa-shopping-bag" /> Add to cart</button>)
          :
          ""}
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    inventory: state.inventory.inventory,
    cart: state.cart.cart,
    user: state.auth.currentUser,
    admin: state.admin.admin
  };
}

function mapDispatch(dispatch) {
  return {
    addToCart(payload) {
      dispatch(addItem(payload));
    },
    updateItem(payload) {
      dispatch(updateItem(payload));
    },
    deleteItem(payload) {
      dispatch(deleteItem(payload));
    },
  };
}

export default connect(mapState, mapDispatch)(SelectedItem);
