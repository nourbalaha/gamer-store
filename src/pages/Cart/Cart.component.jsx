import React, { Component } from 'react'
import { connect } from "react-redux"

import CartItem from "../../components/CartItem/CartItem.component"
import { firestore } from "../../firebase/firebase.config"

import "./Cart.styles.scss"

class Cart extends Component {
  
    async componentDidMount(){
      if(this.props.user){
        const cartRef = firestore.collection("users").doc(this.props.user.uid).collection("cart")
        const cartSnap = await cartRef.get()
        let result = cartSnap.docs
        .map(doc=>doc.data())
        const obj ={}
        result.forEach(doc=>obj[doc.id]=doc)
        this.props.setCart(obj)
      }
    }
    
    render() {
      const keys = Object.keys(this.props.cart)
      let total = keys.length > 0
      ?
      keys.map(key=>Number(this.props.cart[key].price)*Number(this.props.cart[key].quantity)).reduce((acc,val)=>acc+val)
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
                    <h2>The cart is empty</h2>
                }
              <h3>Total: {total}$</h3>
              <button className="checkout-btn">Continue to checkout</button>
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
      setCart(payload){
        dispatch({type:"SET_CART",payload})
      },
    }
  }

export default connect(mapState, mapDispatch)(Cart)
