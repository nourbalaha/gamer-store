import React, { Component } from 'react'
import { connect } from "react-redux"

import CartItem from "../../components/CartItem/CartItem.component"

import "./Cart.styles.scss"

class Cart extends Component {
    render() {
        const keys = Object.keys(this.props.cart)
        return (
            <div className="cart-page">
                {
                    keys.map(item=>{
                        item = this.props.cart[item]
                     return (
                        <CartItem key={item.id} id={item.id} name={item.name} price={item.price} platform={item.platform} quantity={item.quantity} image={item.image} />
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
