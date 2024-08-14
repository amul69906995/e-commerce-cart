import React, { useContext, useEffect, useState } from 'react'
import { cartItemContext } from '../context/CartContext';
import CartItem from './CartItem.jsx';
import { ToastContainer } from 'react-toastify';
const Cart = () => {
  const { cart } = useContext(cartItemContext);
  const [amount, setAmount] = useState()
  console.log(cart)
  const totalPrice = () => {
    return cart.reduce((acc, curr) => acc + curr.qty * curr.price, 0)
  }
  useEffect(() => {
    setAmount(totalPrice())
  }, [cart])
  return (
    <>
      <div style={{ marginTop: '100px', marginBottom: '100px' }}>
      <ToastContainer position="top-center"/>
        {cart && cart.length > 0 ? (
          <>
         {cart.map(product => <CartItem key={product.id} {...product} />)}
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', textAlign: 'right' }}>
            <h2>Total Price: Rs.{amount?.toFixed(2)}</h2>
          <button style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '2px'}}>Checkout</button>
          </div>
          </>
        )
          :
          (<h1 style={{ textAlign: 'center' }}>Your cart is empty</h1>)
        }
      </div>
    </>
  )
}

export default Cart;
