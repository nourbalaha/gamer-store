import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import PropTypes from "prop-types";

const StripeButton = ({price}) => {
    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }
        const newPrice = price * 100;
        const key = 'pk_test_1bIXOFhsOyxsGjAf7XD46O1t00Q1fYdPHh'
        return (
            <StripeCheckout 
                label='Pay Now'
                name='Gamer Store'
                billingAddress
                shippingAddress
                description={`Your total is $${price}`}
                amount={newPrice}
                panelLabel='Pay Now'
                token={onToken}
                stripeKey={key}
            />
        )
}

StripeButton.propTypes = {
    price: PropTypes.number,
}

export default StripeButton;
