import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/database';


var firebaseConfig = {
    apiKey: "AIzaSyBkE7lJjFLYEvHBFc2oydK7AmOJPxJ-X2U",
    authDomain: "acryline-5a75d.firebaseapp.com",
    databaseURL: "https://acryline-5a75d.firebaseio.com",
    projectId: "acryline-5a75d",
    storageBucket: "acryline-5a75d.appspot.com",
    messagingSenderId: "880187415378",
    appId: "1:880187415378:web:b9f3777ae68bd9b0e6b88b",
    measurementId: "G-KQ3BS48F35"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
