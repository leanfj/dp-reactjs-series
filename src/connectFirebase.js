const Rebase = require('re-base');
const firebase = require('firebase/app');
const database = require('firebase/database');
const storage = require('firebase/storage');

// Initialize Firebase
const app = firebase.initializeApp({
  apiKey: 'AIzaSyAmQQ6YjtQ9kIpMRSxLcQLD2CvOelr6AuA',
  authDomain: 'reactjs-minhas-series.firebaseapp.com',
  databaseURL: 'https://reactjs-minhas-series.firebaseio.com',
  projectId: 'reactjs-minhas-series',
  storageBucket: 'reactjs-minhas-series.appspot.com',
  messagingSenderId: '998578352794'
});

const db = firebase.database(app);
const base = Rebase.createClass(db);

export const storageImg = app.storage();

export default base;
