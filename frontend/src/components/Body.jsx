import React, {  useEffect, useState } from 'react'
import Card from './Card'
import './body.css'
import { ToastContainer } from 'react-toastify';
const Body = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
     fetchProducts();
    
  }, [])
  // calling api to get all the products
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json()
      setProducts(data)
      //console.log(data)
      setLoading(false)
    } catch (e) {
      //console.error(e)
      setLoading(false)
    }
  }
 
  if(loading){
    return (<h1 style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>Loading...</h1>)
  }
  else{
  return (
    <>
      <div className="body">
      <ToastContainer position="top-center"/>
       {products&&products.length>0&&products.map(product=><Card key={product.id} {...product}/>)}
      </div>
    </>
  )
}
}

export default Body;
