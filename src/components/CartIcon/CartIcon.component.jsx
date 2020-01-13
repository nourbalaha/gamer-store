import React, { Component } from 'react'
import { compose } from "redux"
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
 
import './CartIcon.style.scss'

import cart from '../../assets/shopping-bag.png'

class CartIcon extends Component {
  render () {
    let keys = Object.keys(this.props.cart);
    let numberOfItems = 0;
    if(keys.length>0){
      numberOfItems = keys.map(key=>this.props.cart[key].quantity).reduce((a,b)=>a+b);
    }
    return (
      <div className='cart-container' onClick={()=>this.props.history.push("/cart")}>
        <img className='cart' src={cart} alt='cart' />
        <span className='cart-counter'>{numberOfItems<10?numberOfItems:"..."}</span>
      </div>
    )
  }
}

function mapState (state) {
  return {
    cart: state.cart.cart
  }
}

export default compose(withRouter, connect(mapState, null))(CartIcon)
