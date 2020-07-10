/*we first import the firebase, but just app part(firebase/app)
then we import the two other stuff: firebase/firestore & firebase/auth
without the first import(firebase/app), we can't import the rest of the data. */

/*To fully understand this whole firebase.utils thing, you'll have to read throught all the documentation of firebase/firebase npm */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCjclyfbDCOoeoa0cS675rAC1c1RdQUb3g",
    authDomain: "onlineshop-db-df61b.firebaseapp.com",
    databaseURL: "https://onlineshop-db-df61b.firebaseio.com",
    projectId: "onlineshop-db-df61b",
    storageBucket: "onlineshop-db-df61b.appspot.com",
    messagingSenderId: "387726104044",
    appId: "1:387726104044:web:f50666effe0dcd7d78dcc9",
    measurementId: "G-1M3KHR791N"
  };

  firebase.initializeApp(config);
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;