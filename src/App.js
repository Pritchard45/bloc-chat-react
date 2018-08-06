import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';
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
    activeRoom: null,
    user: null
    };
  };

  setActiveRoom(room) {
    this.setState({activeRoom: room.key});
    console.log('works');
  }

  setUser(user) {
    this.setState({ user: user});
  }

  render() {
    return (
      <div className="App">
          <h1 className="App-title">Bloc Chat</h1>
        <aside>
          <RoomList
            firebase = {firebase}
            activeRoom = {this.state.activeRoom}
            setActiveRoom = {this.setActiveRoom.bind(this)}

          />
        </aside>
        <MessageList
          firebase = {firebase}
          activeRoom ={this.state.activeRoom}
        />

        <User
          firebase = {firebase}
          setUser = {this.setUser}
        />
      </div>
    );
  }
}

export default App;
