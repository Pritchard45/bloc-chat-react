import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state ={
      messages: [],
      username: "Alex ",
      content: " ",
      sentAt: " ",
      roomId: " "};

  }

  componentDidMount() {
    const messagesRef = this.props.firebase.database().ref("messages/" + this.props.activeRoom);
    messagesRef.on('value', snapshot => {
      const messageChanges = [];
      snapshot.forEach((message) => {
        messageChanges.push({
          key: message.key,
          username: message.val().username,
          content: message.val().content,
          sentAt: message.val().sentAt,
          roomId: message.val().roomId
        });
      });
      this.setState({ messages: messageChanges });
    });
  }


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
    const messageRef = this.props.firebase.database().ref("messages/" + this.props.activeRoom);
    if (this.confirmMessage()) {
      messageRef.push({
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
            <p>{message.username}{message.content}</p>
            <p>{message.roomId}<span format="MM/DD/YY hh:mm:ss A"></span>{message.sentAt}</p>
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
