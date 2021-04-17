import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push('/shipment');
  }

  let thankYou;
  if (orderPlaced) {
    thankYou = <img src={happyImage} alt=""/>
  }

  const handleRemoveProduct = (productKey) => {
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  }

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    
    const cartProducts = productKeys.map(key => {
      const product = fakeData.find(pd => pd.key === key);
      product.quantity = savedCart[key];
      return product;
    })
    setCart(cartProducts);
  }, [])

  return (
    <div className='shop-container'>
      <div className='product-container'>
        {
          cart.map(pd => <ReviewItem product={pd} handleRemoveProduct={handleRemoveProduct} key={pd.key}></ReviewItem>)
        }
        { thankYou }
      </div>
      <div className='cart-container'>
        <Cart cart={cart}>
          <button onClick={handleProceedCheckout} className='shop-btn'>Proceed Checkout</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;