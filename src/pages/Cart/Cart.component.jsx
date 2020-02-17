import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types"

import CartItem from '../../components/CartItem/CartItem.component'

import { setCart } from '../../redux/cart/cart.actions.js'

import './Cart.styles.scss'

const Cart = ({ updateCart, cart, history }) => {
  useEffect(
    () => {
      updateCart()
    },
    [updateCart]
  )

  const keys = Object.keys(cart)
  let total =
    keys.length > 0
      ? keys
          .map(key => Number(cart[key].price) * Number(cart[key].quantity))
          .reduce((acc, val) => acc + val, 0)
      : 0

  return (
    <div className='cart-page'>
      {keys.length > 0
        ? keys.map(item => {
          item = cart[item]
          return (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              platform={item.platform}
              quantity={item.quantity}
              image={item.image}
              />
          )
        })
        : <h2 className='empty-cart-text'>The cart is empty</h2>}
      {total > 0 &&
        <h3>
          Total: {total}$
        </h3>}
      {total > 0 &&
        <button
          className='checkout-btn'
          onClick={() => history.push('/checkout')}
        >
          Continue to checkout
        </button>}
    </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.object,
  updateCart: PropTypes.func,
  history: PropTypes.object,
}

const mapState = state => {
  return {
    cart: state.cart.cart,
  }
}

function mapDispatch (dispatch) {
  return {
    updateCart () {
      dispatch(setCart())
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
