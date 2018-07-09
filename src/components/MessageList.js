import React, { Component } from 'react';

export class MessageList extends Component {
  constructor(props) {
    suer(props);
    this.state = {
      username: "",
      content: "",
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId:""
    };
  }

  createMessage(e) {
    const messagesRef = this.props.firebase.database().ref("messages/" + this.props.activeRoom);
    e.preventDefault();
    messagesRef.push({
      username: this.state.username,
      content: this.state.content,
      sentAt: this.state.sentAt
    });
    this.setState({ username: "", content: "", sentAt: "", roomId: ""});
  }

  componentDidMount() {
    const messagesRef = this.props.firebase.database().ref("messages/" + props.activeRoom);
    messagesRef.on('value', snapshot => {
      const messageChanges = [];
      snapshot.forEach((message) =>{
        messageChanges.push({
          key: message.key,
          username: message.val().username,
          content: message.val().content,
          sentAt: message.val().sentAt,

        });
      });
      this.setState({messages: messageChanges});
    });
  }

  render() {
    const messageList = this.state.messages.map( (message) =>
      key:{message.key}
      <li className="message-new">
        {this.state.message.sentAt}

  );
}
    return (
      <section className="messages">
        <h3 className="message-list"></h3>
          <ul>
            MessageList
          </ul>
      </section>
    );


export default MessageList;
