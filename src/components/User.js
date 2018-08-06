import React, { Component } from 'react';

export class User extends Component {
  constructor(props) {
    super(props);
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut(){
    this.props.firebase.auth().signOut().then(() => {
      this.props.setUser(null);
    });
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }



  render()
    return(
      <h5 onClick={this.signIn}>
        Sign In
      </h5>
      <h5 onClick={this.signOut}>
        Sign Out
      </h5>

    )
  }


export default User;
