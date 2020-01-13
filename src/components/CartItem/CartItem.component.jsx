import React, { Component } from 'react'

import "./CartItem.style.scss"

export class CartItem extends Component {
    render() {
        return (
            <div className="cart-item">
            <img className="cart-item-image" src={this.props.image} alt={this.props.name} />
            <div className="cart-item-details">
                <span className="cart-item-name">{this.props.name}</span>
                <span>Price: {this.props.price} $</span>
                <span>Platform: {this.props.platform}</span>
                <span>Quantity: {this.props.quantity}</span>
            </div>
            <div className="cart-item-buttons">
                <button className="cart-item-remove-button"><i className="fa fa-trash" /></button>
            </div>
         </div>
        )
    }
}

export default CartItem
