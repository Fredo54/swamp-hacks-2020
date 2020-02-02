import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBCKiVqljqAQgsiFzUciBvIptG3JbQDAlk",
    authDomain: "swampfuud2020.firebaseapp.com",
    databaseURL: "https://swampfuud2020.firebaseio.com",
    projectId: "swampfuud2020",
    storageBucket: "swampfuud2020.appspot.com",
    messagingSenderId: "151947950331",
    appId: "1:151947950331:web:4c02e48b5c45ea6ab5985e",
    measurementId: "G-JGF7V9RVR4"
  };

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
