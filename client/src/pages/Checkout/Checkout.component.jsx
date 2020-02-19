import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import StripeButton from '../../components/StripeButton/StripeButton.component'

import './Checkout.style.scss'

const Checkout = ({ cart }) => {
  const keys = Object.keys(cart)
  const total = keys
    .map(key => Number(cart[key].price) * Number(cart[key].quantity))
    .reduce((acc, val) => acc + val, 0)
  const cartItems = keys.map(key => {

    return (
      <tr key={key}>
        <td>
          <img
            className='checkout-image'
            src={cart[key].image}
            alt={cart[key].name}
          />
        </td>
        <td>
          {cart[key].name}
        </td>
        <td>
          ${cart[key].price}
        </td>
        <td>
          {cart[key].quantity}
        </td>
        <td className='checkout-item-platform'>
          {cart[key].platform}
        </td>
      </tr>
    )
  })
  return (
    <div className='check-out-container'>
      <table className='checkout-table'>
        <thead>
          <tr>
            <th>Item</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th className='checkout-item-platform'>Platform</th>
          </tr>
        </thead>
        <tbody>
          {cartItems}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan='5' className='checkout-total'>
              Total: ${total}
            </td>
          </tr>
        </tfoot>
      </table>

      {keys.length > 0 &&
        <div className='test-warning'>
          *Please use the following test credit card for payment*
          <br />
          4242 4242 4242 4242 - Exp: 11/23 - CVV: 123
        </div>}

      {keys.length > 0 && <StripeButton price={total} />}
    </div>
  )
}

Checkout.propTypes = {
    cart: PropTypes.object,
  }

const mapState = state => {
  return {
    cart: state.cart.cart
  }
}

export default connect(mapState)(Checkout)
