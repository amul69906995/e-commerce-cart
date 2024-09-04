import React, { useContext } from 'react'
import { cartItemContext } from '../context/CartContext'
import './cartItem.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CartItem = ({ ...product }) => {
  console.log(product)
  const { removeFromCart, incQty, decQty } = useContext(cartItemContext)
  const handleCartItemRemove = () => {
    removeFromCart(product.id)
    toast.success("item successfully removed ")
  }
  const handleDecrementQty = () => {
    decQty(product.id)
    toast.success("qty decreased successfylly")

  }
  const handleIncrementQty = () => {
    incQty(product.id)
    toast.success("qty increased successfylly")

  }
  return (
    <>
      <div className="cart-item-card">
        <img src={product.image} alt={product.title} className="cart-item-image" />
        <div className="cart-item-details">
          <h3 className="cart-item-title">{product.title}</h3>
          <div className="cart-item-qty-controls">
            <button className="qty-btn" onClick={handleDecrementQty}>-</button>
            <span className="qty-display">{product.qty}</span>
            <button className="qty-btn" onClick={handleIncrementQty}>+</button>
          </div>
          <p className="cart-item-total-price">
          Total: Rs.{ (product.qty * product.price).toFixed(2) }
        </p>
          <button className="remove-btn" onClick={handleCartItemRemove}>Remove</button>
        </div>
      </div>
    </>
  )
}

export default CartItem;
