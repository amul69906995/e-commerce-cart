import React, { useContext, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { cartItemContext } from '../context/CartContext';
import axios from 'axios';
const Checkout = () => {
    const { cart } = useContext(cartItemContext);
    
    const handleCheckout = async () => {
        const stripe=await loadStripe(`${import.meta.env.VITE_STRIPE_PUBLICK_KEY}`)
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/checkout`, { cartItems: cart })
            console.log(data)
            const result=await stripe.redirectToCheckout({
                sessionId: data.sessionId
            })
           // window.location.href = data.sessionUrl; 
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <button style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '10px' }} onClick={handleCheckout}>Checkout</button>
        </>
    )
}

export default Checkout;
