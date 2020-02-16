import React, { Component } from 'react'
import { connect } from "react-redux"

import CartItem from "../../components/CartItem/CartItem.component"

import { setCart } from "../../redux/cart/cart.actions.js"

import "./Cart.styles.scss"

class Cart extends Component {

    componentDidMount(){
      this.props.updateCart()
    }
    
    render() {
      const keys = Object.keys(this.props.cart)
      let total = keys.length > 0
      ?
      keys.map(key=>Number(this.props.cart[key].price)*Number(this.props.cart[key].quantity)).reduce((acc,val)=>acc+val,0)
      :
      0
        return (
            <div className="cart-page">
                {
                    keys.length > 0
                    ?
                    keys.map(item=>{
                        item = this.props.cart[item]
                     return (
                        <CartItem key={item.id} id={item.id} name={item.name} price={item.price} platform={item.platform} quantity={item.quantity} image={item.image} />
                     )   
                    })
                    :
                    <h2 className="empty-cart-text">The cart is empty</h2>
                }
              {total>0 && <h3>Total: {total}$</h3>}
              {total>0 && <button className="checkout-btn" onClick={()=>this.props.history.push("/checkout")}>Continue to checkout</button>}
            </div>
        )
    }
}

const mapState=state=>{
    return {
        cart: state.cart.cart,
        user: state.auth.currentUser,
    }
}

function mapDispatch(dispatch){
    return {
      updateCart(){
        dispatch(setCart())
      },
    }
  }

export default connect(mapState, mapDispatch)(Cart)
