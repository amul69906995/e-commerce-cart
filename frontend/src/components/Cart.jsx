import React, { useContext, useEffect, useState } from 'react'
import { cartItemContext } from '../context/CartContext';
import CartItem from './CartItem.jsx';
import { ToastContainer } from 'react-toastify';
import CuponCode from './CuponCode.jsx'
import PriceDisplay from './PriceDisplay.jsx';
import Checkout from './Checkout.jsx';


const coupons = [
  { id: 1, code: '10OFF', discount: 10 },
  { id: 2, code: '20OFF', discount: 20 },
  { id: 3, code: '30OFF', discount: 30 },
  { id: 4, code: '40OFF', discount: 40 },
  { id: 5, code: '50OFF', discount: 50 }
];

const Cart = () => {
  const { cart } = useContext(cartItemContext);
  const [amount, setAmount] = useState();
  const [discountCode, setDiscountCode] = useState('');
  const [discountedAmount,setDiscountedAmount]=useState()
  // console.log(discountCode)
  // console.log(cart)
  const totalPrice = () => {
    let total = cart.reduce((acc, curr) => acc + curr.qty * curr.price, 0);
    return total;
  }
  const applyDiscount = () => {
    let total = cart.reduce((acc, curr) => acc + curr.qty * curr.price, 0);
    let discountPercent = coupons.find(c => c.code === discountCode);
    console.log(total,discountPercent)
    if (discountPercent) {
      setDiscountCode(discountPercent.code)
    total=total-(total*discountPercent.discount)/100;
    setDiscountedAmount(total);
    }
   else{
    setDiscountedAmount();
   }
  }
  useEffect(() => {
    setAmount(totalPrice())
  }, [cart])
  return (
    <>
      <div style={{ marginTop: '100px', marginBottom: '100px' }}>
        <ToastContainer position="top-center" />
        {cart && cart.length > 0 ? (
          <>
            {cart.map(product => <CartItem key={product.id} {...product} />)}
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', textAlign: 'right' }}>

              <CuponCode discountCode={discountCode} setDiscountCode={setDiscountCode} setDiscountedAmount={setDiscountedAmount} applyDiscount={applyDiscount}/>

             <PriceDisplay amount={amount} discountedAmount={discountedAmount}/>
              <Checkout/>
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
