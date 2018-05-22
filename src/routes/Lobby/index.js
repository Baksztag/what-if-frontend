import React, {Component} from 'react';
import _ from 'lodash';

import {webSocketConsumer} from '../../providers/context/webSocketContext';
import Room from '../Room';

class Lobby extends Component {
    state = {
        error: '',
        newRoomName: '',
        rooms: [],
        joinedRoom: '',
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
                joinedRoom: payload.name,
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
        const {joinRoom} = this.props;

        joinRoom(name);
    };

    render() {
        console.log(this.props)
        const {error, joinedRoom, newRoomName, rooms} = this.state;

        return (
            <div>
                {
                    joinedRoom.length > 0 ?
                        (<div>
                            <Room roomName={joinedRoom}/>
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

export default webSocketConsumer(Lobby);
