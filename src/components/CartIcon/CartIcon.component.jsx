import React, { Component } from 'react'

import "./CartIcon.style.scss"

import cart from "../../assets/shopping-bag.png"

export default class CartIcon extends Component {
    render() {
        return (
            <div className="cart-container">
                <img className="cart" src={cart} alt="cart" />
                <span className="cart-counter">5</span>
            </div>
        )
    }
}
