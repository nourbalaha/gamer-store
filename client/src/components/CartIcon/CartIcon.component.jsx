import React from 'react'
import { compose } from "redux"
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
 
import './CartIcon.style.scss'

import shoppingBag from '../../assets/shopping-bag.png'

const CartIcon = ({ cart, history }) => {
  const keys = Object.keys(cart);
  let numberOfItems = 0;
  if(keys.length > 0){
    numberOfItems = keys.map(key => cart[key].quantity).reduce((a, b) => a + b);
  }
  return (
    <div className='cart-container' onClick={() => history.push("/cart")}>
      <img className='cart' src={shoppingBag} alt='cart-icon' />
      <span className='cart-counter'>{numberOfItems < 10 ? numberOfItems : "..."}</span>
    </div>
  )
}

function mapState (state) {
  return {
    cart: state.cart.cart
  }
}

export default compose(withRouter, connect(mapState))(CartIcon)
