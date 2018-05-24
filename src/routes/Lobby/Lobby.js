import React, {Component} from 'react';
import _ from 'lodash';

import Room from '../Room';
import {lobbyChannelConsumer} from '../../providers/channel/lobbyChannel/lobbyChannelContext';

class Lobby extends Component {
    state = {
        error: '',
        newRoomName: '',
        rooms: [],
        joinedRoomName: '',
        joinedRoom: false,
    };

    componentDidMount() {
        const {getRooms, subscribe} = this.props;

        getRooms();

        subscribe('room_created', (payload) => {
            console.log('New room!', payload.name)
            // this.joinRoom(payload.name)
            this.addRoom(payload.name);
        });

        subscribe('error', (payload) => {
            console.log(payload)
            if (payload.reason === 'exists') {
                this.setState({
                    error: 'Room with this name already exists'
                })
            }
        });

        subscribe('rooms_list', (payload) => {
            const rooms = _.get(payload, 'rooms', []);
            console.log(rooms)

            this.setState({
                rooms,
            });
        });

        subscribe('joined', (payload) => {
            console.log(payload)
            this.setState({
                joinedRoomName: payload.name,
            });
        });
    }

    onNewRoomNameChange = (e) => {
        this.setState({
            newRoomName: e.target.value,
            error: '',
        })
    };

    addRoom = (roomName) => {
        this.setState(prevState => ({
            rooms: prevState.rooms.concat([roomName]),
        }));
    };

    joinRoom = (name) => {
        // const {joinRoom} = this.props;

        // joinRoom(name);
        console.log('joining', name)
        this.setState({
            joinedRoom: true,
            joinedRoomName: name,
        })
    };

    render() {
        const {error, joinedRoom, joinedRoomName, newRoomName, rooms} = this.state;

        return (
            <div>
                {
                    joinedRoom ?
                        (<div>
                            <Room roomName={joinedRoomName}/>
                        </div>)
                        :
                        (<div>
                            <input type="text"
                                   value={newRoomName}
                                   onChange={this.onNewRoomNameChange}
                            />
                            <button onClick={() => this.props.createRoom(newRoomName)}>
                                Create room
                            </button>
                            <span>{error}</span>
                            <div>
                                {rooms.map(room => (
                                    <div key={room}
                                         onClick={() => this.joinRoom(room)}>
                                        {room}
                                    </div>
                                ))}
                            </div>
                        </div>)
                }

            </div>
        );
    }
}

Lobby.propTypes = {};
Lobby.defaultProps = {};

// export default lobbyChannelConsumer(Lobby);
export default Lobby;
