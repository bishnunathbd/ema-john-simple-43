import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();

  return (
    <div className='header'>
      <img src={logo} alt=""/>
      <nav>
        <Link to="/shop">Shop</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        { loggedInUser.email ? <button onClick={() => setLoggedInUser({})}>Sign out</button> 
            : <button onClick={() => history.push('/login')}>Sign in</button>
        }
      </nav>
    </div>
  );
};

export default Header;