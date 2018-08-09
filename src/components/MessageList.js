import React, { Component } from 'react';
import Moment from 'moment';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state ={
      messages: [],
      username: "",
      content: "",
      sentAt: "",
      roomId: "",
      editMe: ""
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
  }

  componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = { val: snapshot.val(), key: snapshot.key}

    this.setState({ messages: this.state.messages.concat( message ) })
  });
    this.messagesRef.on('child_removed', snapshot  => {
        this.setState({ messages: this.state.messages.filter( message => message.key !== snapshot.key )})
  });
 }


    createMessage(e) {
      e.preventDefault();
      console.log(this.state.sentAt);
        this.messagesRef.push({
          username: this.props.user ? this.props.user.displayName : "Guest",
          content: this.state.content,
          sentAt: this.state.sentAt,
          roomId: this.state.roomId
      });
        this.setState({username: "", content: "", sentAt: ""});
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

editMessage(message) {
  this.messagesRef.update(message);
}




  render() {
    let realTime = this.state.messages.sentAt;
    let format = Moment(realTime).format('LLL')
    let activeRoom = this.props.activeRoom
    let currentMessages = (
      this.state.messages.map((message) => {
        if(message.roomId === activeRoom) {
          return
          <ol key = {message.key}>
          {message.username} {message.content} {format}
          <button onClick = { () => this.deleteMessage(message)}>Useless Message?</button>
          <textarea type="text" defaultValue={message.content}/>
          <button onClick={ () => this.editMessage(message)}>edit</button>
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
