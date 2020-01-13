import React, { Component } from 'react'
import { connect } from "react-redux"

import "./Cart.styles.scss"

class Cart extends Component {
    render() {
        const keys = Object.keys(this.props.cart)
        return (
            <div className="cart-page">
                {
                    keys.map((item,index)=>{
                        item = this.props.cart[item]
                     return (
                         <div className="cart-item" key={index}>
                            <img className="cart-item-image" src={item.image} alt={item.name} />
                            <div className="cart-item-details">
                                <span className="cart-item-name">{item.name}</span>
                                <span>{item.price} $</span>
                                <span>{item.platform}</span>
                                <span>Quantity: {item.quantity}</span>
                            </div>
                         </div>
                     )   
                    })
                }
            </div>
        )
    }
}

const mapState=state=>{
    return {
        cart: state.cart.cart,
    }
}

export default connect(mapState)(Cart)
