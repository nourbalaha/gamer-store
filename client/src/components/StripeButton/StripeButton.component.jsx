import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import PropTypes from "prop-types";
import axios from "axios";

const StripeButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_1bIXOFhsOyxsGjAf7XD46O1t00Q1fYdPHh'

    const onToken = token => {
        axios({
            url: "payment",
            method: "post",
            data: {
                amount: priceForStripe,
                token,
            }
        }).then(response => {
            alert("Payment Successful!")
        }).catch(error => {
            alert(
                "There was an issue with your payment. Please make sure you use the provided criedit card"
            )
        })
    }
        return (
            <StripeCheckout 
                label='Pay Now'
                name='Gamer Store'
                billingAddress
                shippingAddress
                description={`Your total is $${price}`}
                amount={priceForStripe}
                panelLabel='Pay Now'
                token={onToken}
                stripeKey={publishableKey}
            />
        )
}

StripeButton.propTypes = {
    price: PropTypes.number,
}

export default StripeButton;
