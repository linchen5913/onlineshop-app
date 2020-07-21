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

  export const createUserProfileDocument = async (userAuth, additionalData) =>{
      if (!userAuth) return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();

      if(!snapShot.exists) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
          }catch(err){
            console.log("error creating user", err.message)
          }
      }
      return userRef;
  }

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });
  //batch.commit() would return a promise, if success it will return a void value(null)
  return await batch.commit()
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}



  firebase.initializeApp(config);
  
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;