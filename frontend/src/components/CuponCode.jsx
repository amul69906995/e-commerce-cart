import React from 'react';

const CuponCode = ({discountCode,setDiscountCode,applyDiscount}) => {

  return (
    <>
      <input 
        type="text" 
        onChange={(e) => setDiscountCode(e.target.value)} 
        value={discountCode}
        placeholder="Enter coupon code"
        style={{
          padding: '10px',
          margin: '10px 0',
          border: '1px solid #ccc',
          borderRadius: '5px',
          width: '200px',
          fontSize: '16px'
        }}
      />
      <button 
        type='submit'
        onClick={() => applyDiscount()}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          marginLeft: '10px'
        }}
      >
        Apply
      </button>
    </>
  );
}

export default CuponCode;

