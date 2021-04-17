import React from 'react';

const ReviewItem = (props) => {
  const {name, quantity, key, price} = props.product;
  const handleRemoveProduct = props.handleRemoveProduct;

  const reviewItemStyle = {
    borderBottom: '1px solid lightgray',
    marginLeft: '200px',
    marginBottom: '5px',
    paddingBottom: '5px'
  }
  return (
    <div style={reviewItemStyle}>
      <h4 className='product-name'>{name}</h4>
      <p>Quantity: {quantity}</p>
      <p><small>${price}</small></p>
      <br/>
      <button onClick={() => handleRemoveProduct(key)} className='shop-btn'>Remove</button>
    </div>
  );
};

export default ReviewItem;