import React from 'react';

const PriceDisplay = ({ amount, discountedAmount }) => {
  return (
    <div>
      {/* Display the original price with line-through if there's a discounted amount */}
      <h2 
        style={{
          textDecoration: discountedAmount ? 'line-through' : 'none',
          color: discountedAmount ? 'red' : 'black',
        }}
      >
        Total Price: Rs.{amount?.toFixed(2)}
      </h2>

      {/* Display the discounted amount if available */}
      {discountedAmount && (
        <h2 
          style={{
            color: 'green', // Example color for discounted price
            marginTop: '10px'
          }}
        >
          Discounted Price: Rs.{discountedAmount?.toFixed(2)}
        </h2>
      )}
    </div>
  );
};

export default PriceDisplay;
