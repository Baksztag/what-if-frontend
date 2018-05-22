import React, {Component} from 'react';
import {Socket} from 'phoenix-channels';
import {BrowserRouter} from 'react-router-dom';

import AppRouter from './Router';
import {API} from '../services';
import {Loader} from '../components';

import DisplayNameForm from '../routes/DisplayName';
import {WebSocketProvider as Provider} from './context/webSocketContext';

class WebSocketProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            error: '',
        };

        API.getUserToken()
            .then(token => {
                this.socket = new Socket(API.WS_URL, {params: {token}});
                this.socket.connect();

                this.channel = this.socket.channel("lobby:*", {});

                this.channel.join()
                    .receive("ok", resp => {
                        console.log("Joined successfully", resp)
                        this.setState(prevState => ({
                            connected: true,
                            error: '',
                        }));
                    })
                    .receive("error", resp => {
                        console.log("Unable to join", resp)
                        this.setState(prevState => ({
                            connected: false,
                            error: resp.reason,
                        }))
                    })
            })
            .catch(error => {
                this.socket = null;
                this.channel = null;
                this.setState(prevState => ({
                    connected: false,
                    error: error.reason,
                }));
            })
    }

    foo = () => {
        console.log('foo')
    };

    subscribe = (message, onReceiveCallback) => {
        this.channel.on(message, onReceiveCallback);
    };

    createRoom = (newRoomName) => {
        console.log('create room', newRoomName)
        this.channel.push("create_room", {name: newRoomName});
    };

    getRooms = () => {
        this.channel.push("get_rooms", {});
    };

    joinRoom = (roomName) => {
        this.channel.push("join_room", {name: roomName});
    };

    render() {
        return this.state.connected ?
            (<Provider value={{
                foo: this.foo,
                createRoom: this.createRoom,
                subscribe: this.subscribe,
                getRooms: this.getRooms,
                joinRoom: this.joinRoom,
            }}>
                <BrowserRouter>
                    <AppRouter/>
                </BrowserRouter>
            </Provider>)
            :
            (this.state.error === 'User not registered' ?
                    (<DisplayNameForm/>)
                    :
                    (<div>
                         <Loader/>
                         {this.state.error}
                     </div>)
             )
    }
}

WebSocketProvider.propTypes = {};
WebSocketProvider.defaultProps = {};

export default WebSocketProvider;
