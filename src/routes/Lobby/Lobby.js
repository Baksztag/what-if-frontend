import React, {Component} from 'react';
import _ from 'lodash';

import Room from '../Room';
import RoomList from './RoomList';

import {Button, Input} from '../../components';

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
            this.addRoom(payload.name);
        });

        subscribe('error', (payload) => {
            if (payload.reason === 'exists') {
                this.setState({
                    error: 'Room with this name already exists',
                });
            } else if (payload.reason === 'name_invalid') {
                this.setState({
                    error: 'Invalid room name',
                });
            }
        });

        subscribe('rooms_list', (payload) => {
            const rooms = _.get(payload, 'rooms', []);

            this.setState({
                rooms,
            });
        });

        subscribe('joined', (payload) => {
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
        return () => {
            this.setState({
                joinedRoom: true,
                joinedRoomName: name,
            })
        };
    };

    disconnectFromRoom = () => {
        this.setState(() => ({
            joinedRoom: false,
            joinedRoomName: '',
        }));
    };

    render() {
        const {error, joinedRoom, joinedRoomName, newRoomName, rooms} = this.state;

        return (
            <div>
                {
                    joinedRoom ?
                        (<div>
                            <Room disconnectFromRoom={this.disconnectFromRoom}
                                  roomName={joinedRoomName}
                            />
                        </div>)
                        :
                        (<div>
                            <Input label="Room name"
                                   onChange={this.onNewRoomNameChange}
                                   value={newRoomName}
                                   error={error}/>
                            <Button onClick={() => this.props.createRoom(newRoomName)}>
                                Create room
                            </Button>
                            <RoomList joinRoom={this.joinRoom}
                                      rooms={rooms}
                            />
                        </div>)
                }

            </div>
        );
    }
}

Lobby.propTypes = {};
Lobby.defaultProps = {};

export default Lobby;
