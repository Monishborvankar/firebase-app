import firebase from "firebase/compat/app";
import "firebase/compat/database";
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBuw2VigfHhd7-9ZClE_OZHvxWOO6mvIIk",
  authDomain: "fir-6485e.firebaseapp.com",
  databaseURL: "https://fir-6485e-default-rtdb.firebaseio.com",
  projectId: "fir-6485e",
  storageBucket: "fir-6485e.appspot.com",
  messagingSenderId: "442147233102",
  appId: "1:442147233102:web:61c718f8e089f7e750121f",
  measurementId: "G-5NXP5Q1S5W"
  };

const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
export const dataref = firebase.database();
export const storage = firebase.storage();