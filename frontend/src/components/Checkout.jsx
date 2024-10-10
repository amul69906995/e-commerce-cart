import React, { useContext, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cartItemContext } from '../context/CartContext';
import axios from 'axios';
const Checkout = ({discountCode}) => {
    const { cart } = useContext(cartItemContext);
    
    const handleCheckout = async () => {
        const stripe=await loadStripe(`${import.meta.env.VITE_STRIPE_PUBLICK_KEY}`)
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/checkout`, { cartItems: cart ,discountCoupan:discountCode?discountCode:null})
            console.log(data)
            const result=await stripe.redirectToCheckout({
                sessionId: data.sessionId
            })
           // window.location.href = data.sessionUrl; 
        } catch (err) {
            console.log(err.response.data.error);
            toast.error(err.response.data.error)
        }
    }
    return (
        <>
            <button style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '10px' }} onClick={handleCheckout}>Checkout</button>
        </>
    )
}

export default Checkout;
