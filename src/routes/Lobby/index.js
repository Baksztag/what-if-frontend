import React, {Component} from 'react';

import {webSocketConsumer} from '../../providers/webSocket/webSocketContext';
import Lobby from './Lobby';
import DisplayNameForm from '../DisplayName';

class LobbyChannelProvider extends Component {
    state = {
        connected: false,
        error: '',
    }

    componentDidMount() {
        const {joinChannel} = this.props;

        this.channel = joinChannel('lobby:*', {}, this.onJoinSuccess, this.onJoinError);
    }

    onJoinSuccess = (resp) => {
        console.log("Joined successfully", resp)
        this.setState(() => ({
            connected: true,
            error: '',
        }));
    };

    onJoinError = (resp) => {
        console.log("Unable to join", resp)
        this.setState(() => ({
            connected: false,
            error: resp.reason,
        }))
    };

    subscribe = (message, onReceiveCallback) => {
        this.channel.on(message, onReceiveCallback);
    };

    createRoom = (newRoomName) => {
        // console.log('create room', newRoomName)
        this.channel.push("create_room", {name: newRoomName});
    };

    getRooms = () => {
        this.channel.push("get_rooms", {});
    };

    // joinRoom = (roomName) => {
    //     this.channel.push("join_room", {name: roomName});
    // };

    onRegisterSuccess = () => {
        this.setState(() => ({
            error: '',
        }));
    };

    render() {
        // return (
        //     <lobbyChannelProvider value={{
        //         createRoom: this.createRoom,
        //         subscribe: this.subscribe,
        //         getRooms: this.getRooms,
        //         joinRoom: this.joinRoom,
        //     }}>
        //         <Lobby/>
        //     </lobbyChannelProvider>
        // )
        const {error} = this.state;

        return (
            error === 'User not registered' ?
                (<DisplayNameForm onRegisterSuccess={this.onRegisterSuccess}/>)
                :
                (!!this.channel && <Lobby subscribe={this.subscribe}
                                          createRoom={this.createRoom}
                                          getRooms={this.getRooms}
                    // joinRoom={this.joinRoom}
                />)
        )
    }
}

export default webSocketConsumer(LobbyChannelProvider);
