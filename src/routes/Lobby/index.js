import React, {Component} from 'react';

import {webSocketConsumer} from '../../providers/webSocket/webSocketContext';
import Lobby from './Lobby';
import DisplayNameForm from '../DisplayName';

class LobbyChannelProvider extends Component {
    state = {
        connected: false,
        error: '',
    };

    componentDidMount() {
        const {joinChannel} = this.props;

        this.channel = joinChannel('lobby:*', {}, this.onJoinSuccess, this.onJoinError);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.error === 'User not registered' && this.state.error === '') {
            const {joinChannel} = this.props;

            this.channel = joinChannel('lobby:*', {}, this.onJoinSuccess, this.onJoinError);
        }
    }

    onJoinSuccess = () => {
        this.setState(() => ({
            connected: true,
            error: '',
        }));
    };

    onJoinError = (resp) => {
        this.setState(() => ({
            connected: false,
            error: resp.reason,
        }))
    };

    subscribe = (message, onReceiveCallback) => {
        this.channel.on(message, onReceiveCallback);
    };

    createRoom = (newRoomName) => {
        this.channel.push("create_room", {name: newRoomName});
    };

    getRooms = () => {
        this.channel.push("get_rooms", {});
    };

    onRegisterSuccess = () => {
        this.setState(() => ({
            error: '',
        }));
    };

    render() {
        const {connected, error} = this.state;

        return (
            error === 'User not registered' ?
                (<DisplayNameForm onRegisterSuccess={this.onRegisterSuccess}/>)
                :
                (connected && <Lobby subscribe={this.subscribe}
                                          connected={connected}
                                          createRoom={this.createRoom}
                                          getRooms={this.getRooms}
                />)
        )
    }
}

export default webSocketConsumer(LobbyChannelProvider);
