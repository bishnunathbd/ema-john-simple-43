import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
  const {name, img, price, seller, stock, key} = props.product;
  const handleAddToCart = props.handleAddToCart;

  return (
    <div className='product'>
      <div>
        <img src={img} alt=""/>
      </div>
      <div>
        <h4 className='product-name'><Link to={'/product/'+key}>{name}</Link></h4>
        <br/>
        <p><small>by: {seller}</small></p>
        <p>${price}</p>
        <p><small>Only {stock} left in stock - order soon</small></p>
        { 
          props.showAddToCart && <button onClick={() => handleAddToCart(props.product)} className='shop-btn'><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
        }
      </div>
    </div>
  );
};

export default Product;