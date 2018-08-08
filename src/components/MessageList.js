import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state ={
      messages: [],
      username: "",
      content: "",
      sentAt: "",
      roomId: ""
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message ) });
      });
    this.messagesRef.on('child_removed', snapshot  => {
        this.setState({ messages: this.state.messages.filter( message => message.key !== snapshot.key )})
  });
}

    createMessage(e) {
      e.preventDefault();
        this.messagesRef.push({
          username: this.props.user ? this.props.user.displayName : "Guest",
          content: this.state.content,
          sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
          roomId: this.state.roomId
      });
        this.setState({username: "", content: "", sentAt: "", message: ""});
      e.target.reset();
    }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      username: this.state.username,
      content: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom
    });
  }

  deleteMessage(message) {
  this.messagesRef.child(message.key).remove();
}

  render() {
    let activeRoom = this.props.activeRoom
    let currentMessages = (
      this.state.messages.map((message) => {
        if(message.roomId === activeRoom) {
          return <ol key = {message.key}>{message.username} {message.content} {message.sentAt}
          <button onClick = { () => this.deleteMessage(message)}>Useless Message?</button>
          </ol>
        }
        return null;
      })
    )

    return (
      <section>
        <h3>Messages</h3>
        <div>
        <div>
          <li>
            {currentMessages}

          </li>
        </div>
        </div>
          <form onSubmit={this.createMessage}>
            <textarea type="text" placeholder="Enter message" onChange={ this.handleChange }/>
            <input type="submit" value="Send Message"/>
          </form>
      </section>
    );
  }
}

export default MessageList;
