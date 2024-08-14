import React from 'react';
import './card.css';
import ButtonCard from './ButtonCard';
import productDefaultImg from '../assets/productDefaultImg.png';
const ProductCard = ({...product}) => {
  //test product details
  // const product = {
  //   imageUrl: 'https://via.placeholder.com/150',
  //   name: 'Product Name',
  //   price: 49.99,
  //   qty:2
  // };
//to format currency to 0 place after decimal we can also use floor or celi
   const formatCurrency = (value) => {
   // console.log(value)
    return `Rs.${value.toFixed(2)}`;
   };
// title format if product title is too long
const formatTitle=(value)=>{
  //check value 
  // console.log(value.substr(0,30))
  if(value.length>20){
     return `${value.substr(0,30)}...`
  }
  return `${value.substr(0,30)}`;
}

  return (
    <div className="product-card">
      <img src={product.image||productDefaultImg} alt={formatTitle(product.title)} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{formatTitle(product.title)||"title"}</h3>
        <p className="product-price">{formatCurrency(product.price)||"Rs.100"}</p>
        <ButtonCard {...product}/>
      </div>
    </div>
  );
};

export default ProductCard;

