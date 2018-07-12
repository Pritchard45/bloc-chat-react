import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state ={ username: "", content: "", sentAt: "", messages: [], roomId: ""};
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

  createMessage(e) {
    const messageRef = this.props.firebase.database().ref("messages/" + this.props.activeRoom);
    e.preventDefault();
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

  componentWillReceiveProps(nxtProps) {
    if (nxtProps.activeRoom !== this.props.activeRoom) {
      const messageRef = this.props.firebase.database().ref("messages/" + nxtProps.activeRoom);
      messageRef.on('value', snapshot => {
        let messageChanges = [];
        snapshot.forEach((message) => {
          messageChanges.push({
            key: message.key,
            username: message.val().username,
            content: message.val().content,
            sentAt: message.val().sentAt,
            roomId: message.val().roomId
          });
        });
        this.setState({ messages: messageChanges});
      });
    }
  }



  render() {
    return (
      <section>test</section>


    )
  }
}

export default MessageList;
