import React, { useContext, useEffect, useState } from 'react';
import './buttonCard.css';
import { cartItemContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ButtonCard = ({ ...product }) => {
  console.log("buttonCard", product)
  const { cart, addToCart,incQty,decQty} = useContext(cartItemContext)
  const [isQty, setIsQty] = useState(false)
  const [currentProduct, setCurrentProduct] = useState({});
  const handleAddToCartClick = () => {
    addToCart(product)
    toast.success('product added')
  }
  const checkIsQty = (id) => {
    const isProductInCart = cart.find(item => item.id === id)
    setCurrentProduct(isProductInCart)
    if (isProductInCart) setIsQty(true);
    else setIsQty(false)
  }
  const handleDecQty=(id)=>{
    decQty(id)
    toast.success('qty decreased',)
  }
  const handleIncQty=(id)=>{
    incQty(id)
    toast.success('qty increased')

  }
  useEffect(() => {
    checkIsQty(product.id)
  }, [cart])
  if (isQty) {
    return (
      <div className="quantity-button">
        <button className="quantity-btn" onClick={()=>handleDecQty(product.id)}>-</button>
        <span className="quantity-display">{currentProduct.qty}</span>
        <button className="quantity-btn" onClick={()=>handleIncQty(product.id)}>+</button>
      </div>
    )
  }
  else {
    return (
      <>
      <button className="add-to-cart-btn" onClick={handleAddToCartClick}>Add to Cart</button>
      </>
    );
  }
}

export default ButtonCard;
