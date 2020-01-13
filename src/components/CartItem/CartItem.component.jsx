import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import "./CartItem.style.scss";

export class CartItem extends Component {
  removeFromCart = () => {
    this.props.onRemoveFromCart({id: this.props.id})
  };
  render() {
    return (
      <div className="cart-item">
        <img
          className="cart-item-image"
          src={this.props.image}
          alt={this.props.name}
        />
        <div className="cart-item-details">
          <span className="cart-item-name" onClick={()=>this.props.history.push(`/inventory/${this.props.id}`)}>
            {this.props.name}
          </span>
          <span>
            Price: {this.props.price} $
          </span>
          <span>
            Platform: {this.props.platform}
          </span>
          <span>
            Quantity: {this.props.quantity}
          </span>
        </div>
        <div className="cart-item-buttons">
          <button className="cart-item-remove-button" onClick={this.removeFromCart}>
            <i className="fa fa-trash" />
          </button>
        </div>
      </div>
    );
  }
}


const mapState=state=>{
    return {
        cart: state.cart.cart,
    }
}

const mapDispatch = dispatch=>{
    return {
        onRemoveFromCart(payload) {
          dispatch({ type: "REMOVE_ITEM", payload });
        }
    }
}

export default compose(withRouter, connect(mapState, mapDispatch))(CartItem)