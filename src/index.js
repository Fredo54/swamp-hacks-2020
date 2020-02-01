import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as firebase from 'firebase/app';
import "firebase/auth";

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


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
