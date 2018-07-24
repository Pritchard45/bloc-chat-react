import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state ={
      messages: [],
      username: "Alex ",
      content: " ",
      sentAt: " ",
      roomId: " "
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }


  componentDidMount() {

    this.messagesRef.on('value', snapshot => {
      const messageChanges = [];
      snapshot.forEach((message) => {
        messageChanges.push({
          key: message.key,
          username: message.val().username,
          content: message.val().content,
          sentAt: (new Date(message.sentAt)).toLocaleString('en-GB', {timeZone: 'EST'}),
          roomId: this.state.roomId
        });
      });
      this.setState({ messages: messageChanges});
    });
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
      roomId: this.state.roomId
    });
  }

  createMessage(content) {
    if (this.confirmMessage()) {
      this.messagesRef.push({
        username: this.state.username,
        content: this.state.content,
        sentAt: this.state.sentAt,
        roomId: this.state.roomId
      });
      this.setState({username: "", content: "", sentAt: ""});
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.createMessage(this.state.content);
  }


  render() {
    return (
      <section>
        <h3>Messages</h3>
        {this.state.messages.map( message => 
          <li key = {message.key}>
            <p>{message.roomId}{message.username}{message.content}</p>
            <p>{message.sentAt}</p>
          </li>
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
