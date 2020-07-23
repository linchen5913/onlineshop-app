import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H5PnfL3tqwDrzEgrcHNQWmTPTWZGBqYlKWIfndpi1FyT4IkwrOwOssSS0DFXLW3hhidxtSNBBbZE5zDgxFJyKxP0052RQ6Wgr';


    const onToken = token => {
        alert('Payment successful!! Thank you for your purchase.');
    }
    return (
        <StripeCheckout
            label='Pay Now'
            name={`Lin Chen's Online-Shop`}
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;