import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider ).then((result) => {
      const user = result.user;
      this.props.setUser(user);
    });
  }

  signOut(){
    this.props.firebase.auth().signOut();
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }



  render(){
    return(
      <div>
        <h5 onClick={this.signIn}>Sign In</h5>
        <h5 onClick={this.signOut}>Sign Out</h5>
      </div>


    )
  }

}



export default User;
