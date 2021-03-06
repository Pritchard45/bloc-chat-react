import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms:[],
      newRoomId: ''
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
  }


  handleRoomChange(e) {
    this.setState({newRoomId: e.target.value })
  }

  createRoom(newRoomId) {
    //if (!this.state.newRoomName) {return}
    this.roomsRef.push({
      roomId: newRoomId
    });
    this.setState({ newRoomId: '' });
 }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
    this.roomsRef.on('child_removed', snapshot => {
 this.setState({ rooms: this.state.rooms.filter( room => room.key !== snapshot.key) })
   });
  }

  handleSubmit(e){
    e.preventDefault();
    this.createRoom(this.state.newRoomId);
  }

  deleteRoom(room) {
      this.roomsRef.child(room.key).remove();
    }


render() {


  return (
    <section>
      <h1> Room List </h1>
      {this.state.rooms.map( room =>
          <li key = {room.key} >
            <button onClick = { () => this.props.setActiveRoom(room)}>{room.roomId}</button>
            <button onClick = { () => this.deleteRoom(room)}>Useless Room?</button>
          </li>
      )}
        <form onSubmit={ (e) => this.handleSubmit(e)}>
              <input type="text" value={this.state.newRoomId} onChange={ (e) => this.handleRoomChange(e) }/>
              <input type = "submit" />

        </form>
    </section>
  );
}
}

export default RoomList;
