import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';
import * as firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyCENdri264sAfEg9LjrW2VacUzDpilt_J4",
  authDomain: "bloc-chat-arp.firebaseapp.com",
  databaseURL: "https://bloc-chat-arp.firebaseio.com",
  projectId: "bloc-chat-arp",
  storageBucket: "bloc-chat-arp.appspot.com",
  messagingSenderId: "351834405867"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  };
  render() {
    return (
      <div className="App">
          <h1 className="App-title">Bloc Chat</h1>
        <main>
          <RoomList firebase = {firebase} />
        </main>
      </div>
    );
  }
}

export default App;
