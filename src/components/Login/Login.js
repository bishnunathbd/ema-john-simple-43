import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, fbSignIn, googleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';

function Login() {
  initializeLoginFramework();

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    success: false,
    error: ''
  });
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const handleFbSignIn = () => {
    fbSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const userSignOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false);
      })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  }

  // to valid input fields & update user state
  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const passwordLength = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value)
      isFieldValid = passwordLength && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    e.preventDefault();
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignedIn ? <button onClick={userSignOut}>Sign out</button>
          : <button onClick={handleGoogleSignIn}>Google Sign In</button>
      }
      <br /><br />
      <button onClick={handleFbSignIn}>Sign in using Facebook</button>

      <div style={{ border: '2px solid purple', width: '50%', margin: '20px auto', padding: '20px' }}>
        <h2>Our own authentication</h2>
        <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} id="" />
        <label htmlFor="newUser">New user sign up</label>
        <br /><br />
        <form onSubmit={handleSubmit}>
          {newUser && <input name='name' onBlur={handleBlur} type="text" placeholder='your name' />}
          <br /><br />
          <input type="text" name='email' onBlur={handleBlur} placeholder='Your email' required />
          <br /> <br />
          <input type="password" name="password" onBlur={handleBlur} id="" placeholder='Your password' required />
          <br /> <br />
          <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
        </form>
        <p style={{ color: 'red' }}>{user.error}</p>
        {
          user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'logged in'} successfully.</p>
        }
      </div>
    </div>
  );
}

export default Login;
