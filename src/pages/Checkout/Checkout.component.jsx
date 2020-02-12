import React, { Component } from 'react'

import StripeButton from "../../components/StripeButton/StripeButton.component"

import "./Checkout.style.scss"

export default class Checkout extends Component {
    render() {
        return (
            <div className="check-out-container">
                <div className="test-warning">
                    *Please use the following test credit card for payment*
                    <br />
                    4242 4242 4242 4242 - Exp: 11/23 - CVV: 123
                </div>
                <StripeButton price={100} />
            </div>
        )
    }
}
