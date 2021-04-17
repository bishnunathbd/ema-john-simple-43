// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from './firebase.config';

// Initialize Firebase
export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}

export const googleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider)
    .then(result => {
      // The signed-in user info.
      const { displayName, photoURL, email } = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
        error: ''
      };
      return signedInUser;
    })
    .catch(err => {
      // Handle Errors here.
      console.log(err);
      console.log(err.message);
    })
}

export const fbSignIn = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(fbProvider)
    .then((result) => {
      const { displayName, photoURL, email } = result.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
        error: ''
      };
      return signedInUser;
      // console.log('fb user after sign in', user);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      return error;
    });
}

export const handleSignOut = () => {
  return firebase.auth().signOut()
    .then(res => {
      const signedOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        success: false,
        error: ''
      }
      return signedOutUser;
    })
    .catch(err => {
      // an error happened
      console.log(err)
    })
}


export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      updateUserName(name);
      const {displayName, email, photoURL} = res.user;
      const newUserInfo = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
        error: ''
      }
      return newUserInfo;
    })
    .catch((error) => {
      const errorMessage = error.message;
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
    });
}


export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      const {displayName, email, photoURL} = res.user;
      const newUserInfo = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true,
        error: ''
      }
      return newUserInfo;
    })
    .catch((error) => {
      const errorMessage = error.message;
      const newUserInfo = {};
      newUserInfo.error = errorMessage;
      newUserInfo.success = false;
      return newUserInfo;
    });
}


// Update a user's profile to firebase
const updateUserName = name => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(function () {
    console.log('user name updated successfully.');
  }).catch(function (error) {
    console.log(error);
  });
}


