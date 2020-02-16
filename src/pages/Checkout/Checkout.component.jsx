import React, { Component } from 'react'
import { connect } from "react-redux"

import StripeButton from "../../components/StripeButton/StripeButton.component"

import "./Checkout.style.scss"

class Checkout extends Component {
    render() {
        const keys = Object.keys(this.props.cart);
        const total = keys.map(key=>Number(this.props.cart[key].price)*Number(this.props.cart[key].quantity)).reduce((acc,val)=>acc+val,0)
        const cartItems = keys.map(key=>{
            return (
                <tr key={key}>
                    <td><img className="checkout-image" src={this.props.cart[key].image} alt={this.props.cart[key].name}/></td>
                    <td>{this.props.cart[key].name}</td>
                    <td>${this.props.cart[key].price}</td>
                    <td>{this.props.cart[key].quantity}</td>
                    <td className="checkout-item-platform">{this.props.cart[key].platform}</td>
                </tr>
            )
        })
        return (
            <div className="check-out-container">

                <table className="checkout-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th className="checkout-item-platform">Platform</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        cartItems
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5" className="checkout-total">Total: ${total}</td>
                        </tr>
                    </tfoot>
                    </table>

                
                {keys.length>0 && 
                <div className="test-warning">
                    *Please use the following test credit card for payment*
                    <br />
                    4242 4242 4242 4242 - Exp: 11/23 - CVV: 123
                </div>}

                {keys.length>0 && <StripeButton price={total} />}

            </div>
        )
    }
}

const mapState = state => {
    return {
        cart: state.cart.cart,
    }
}

export default connect(mapState)(Checkout)