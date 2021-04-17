import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
  const first10 = fakeData.slice(0, 10);

  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const previousCart = productKeys.map(key => {
      const product = fakeData.find(product => product.key === key);
      product.quantity = savedCart[key];
      return product;
    })
    setCart(previousCart);
  }, [])

  const handleAddToCart = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter(pd => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    }
    else {
      product.quantity = count;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(toBeAddedKey, count);
  }

  return (
    <div className='shop-container'>
      <div className="product-container">
        {
          products.map(pd => <Product product={pd} handleAddToCart={handleAddToCart} showAddToCart={true} key={pd.key}></Product>)
        }
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to='/review'>
            <button className='shop-btn'>Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;