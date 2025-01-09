import { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { cartItemContext } from '../context/CartContext';
import axios from 'axios';
const CryptoCheckout = ({ discountCode }) => {
    const { cart } = useContext(cartItemContext);
    const [isLoading,setIsLoading]=useState(false);
    const handleCheckout = async () => {
        console.log("handle crypto checkout",cart,discountCode);
        try {
            setIsLoading(true);
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/crypto-checkout`, { cartItems: cart ,discountCoupan:discountCode?discountCode:null})
        console.log("crypto return data",data.url);
        if(data.url){
            //window.location.href = data.url;
            window.open(data.url, '_blank');
        }
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false);
        }
        
    }
    return (
        <>
        <>
            <button
                style={{
                    backgroundColor: isLoading ? '#ccc' : '#4CAF50',
                    color: '#fff',
                    padding: '10px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                }}
                disabled={isLoading}
                onClick={handleCheckout}
            >
                {isLoading ? (
                    <div
                        style={{
                            border: '4px solid #f3f3f3', // Light grey
                            borderTop: '4px solid #3498db', // Blue
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            animation: 'spin 1s linear infinite',
                        }}
                    ></div>
                ) : (
                    "Crypto Checkout"
                )}
            </button>

            {/* Inline keyframes */}
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
        </>
        </>
    )
}

export default CryptoCheckout;
