import keys from './config/keys'

const firebase = require('firebase')
require('firebase/firestore');
  // Initialize Firebase
  firebase.initializeApp(keys.firebase);
  firebase.analytics();

  const db = firebase.firestore();
  export default db;