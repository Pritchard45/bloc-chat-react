import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state ={
      messages: [],
      username: "Alex ",
      content: " ",
      sentAt: " ",
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

/*
  this.messagesRef.on('value', snapshot => {
    const message = snapshot.val();

})
*/

//filter Message method
//which displays all the messages associated to a given roomId
//use filter()

  confirmMessage(str) {
    const msgContent = str || this.state.content;
    const msgLength = msgContent.trim().length;
    if (msgLength > 0) { return true; }
    else { return false; }
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.state.username,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    });
  }

  createMessage(content) {
    if (this.confirmMessage()) {
      this.messagesRef.push({
        username: this.state.username,
        content: this.state.content,
        sentAt: this.state.sentAt,
        roomId: this.props.activeRoom
    });
      this.setState({username: "", content: "", sentAt: ""});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.createMessage(this.state.content);
  }


  render() {
    if (this.props.activeRoom) {
      console.log(this.props.activeRoom.key);
  }

    const filterMessages = this.state.messages.filter((message)=> {
      console.log(message);
      return message.roomId === this.props.activeRoom.key;

  });
    return (
      <section>
        <h3>Messages</h3>
        {filterMessages.map( message =>
          <ul key = {message.key}>
            <li>{message.username}{message.content}{message.sentAt}</li>
          </ul>
        )}


          <form onSubmit={ (e) => this.handleSubmit(e)}>
            <input type="text" value={this.state.content} onChange={ (e) => this.handleChange(e) }/>
            <input type="submit" value="Send Message"/>
          </form>
      </section>
    );
  }
}

export default MessageList;
