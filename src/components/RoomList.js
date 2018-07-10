import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms:[],
      newRoomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
  }


  handleRoomChange(e) {
    this.setState({newRoomName: e.target.value })
  }

  createRoom(newRoomName) {
    //if (!this.state.newRoomName) {return}
    this.roomsRef.push({
      name: newRoomName
    });
    this.setState({ newRoomName: '' });
 }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.createRoom(this.state.newRoomName);
  }



//got this to render//
render() {


  return (
    <section>
      <h1> Room List </h1>
      {this.state.rooms.map( room =>
          <li key = {room.key} >
            <button onClick = { () => this.props.setActiveRoom(room)}>{room.name}</button>
          </li>
      )}
        <form onSubmit={ (e) => this.handleSubmit(e)}>
              <input type="text" value={this.state.newRoomName} onChange={ (e) => this.handleRoomChange(e) }/>
              <input type = "submit" />

        </form>
    </section>
  );
}
}

export default RoomList;
