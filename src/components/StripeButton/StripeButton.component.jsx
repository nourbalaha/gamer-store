import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default class StripeButton extends Component {
    onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }
    render() {
        const price = this.props.price * 100;
        const key = 'pk_test_1bIXOFhsOyxsGjAf7XD46O1t00Q1fYdPHh'
        return (
            <StripeCheckout 
                label='Pay Now'
                name='Gamer Store'
                billingAddress
                shippingAddress
                description={`Your total is $${this.props.price}`}
                amount={price}
                panelLabel='Pay Now'
                token={this.onToken}
                stripeKey={key}
            />
        )
    }
}
