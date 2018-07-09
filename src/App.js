import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
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
    this.state = {activeRoom: "", user: null};

  };

  activeRoom(room) {
    this.setState({activeRoom: room});
    const roomKey = room === "" ? "" : room.key;
    const roomTitle = room === "" ? "" : room.title;
  }
  // working as intended
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
