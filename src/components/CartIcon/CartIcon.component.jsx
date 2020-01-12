import React, { Component } from 'react'
import { compose } from "redux"
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
 
import './CartIcon.style.scss'

import cart from '../../assets/shopping-bag.png'

class CartIcon extends Component {
  render () {
    return (
      <div className='cart-container' onClick={()=>this.props.history.push("/cart")}>
        <img className='cart' src={cart} alt='cart' />
        <span className='cart-counter'>{this.props.cart.length<10?this.props.cart.length:"..."}</span>
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
