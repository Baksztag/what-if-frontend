import React, {Component} from 'react';
import {Socket} from '../../phoenix-channels';
import {BrowserRouter} from 'react-router-dom';

import AppRouter from '../Router';
import {API} from '../../services/index';
import {Loader} from '../../components/index';

import DisplayNameForm from '../../routes/DisplayName/index';
import {WebSocketProvider as Provider} from './webSocketContext';

class WebSocketProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            // connected: true,
            error: '',
        };

        API.getUserToken()
            .then(token => {
                this.socket = new Socket(API.WS_URL, {params: {token}});
                this.socket.connect();

                this.socket.onOpen(() => {
                    this.setState(() => ({
                        connected: true,
                        error: '',
                    }));
                });

                // this.setState(() => ({
                //     connected: true,
                //     error: '',
                // }));

                this.socket.onError((error) => {
                    console.log(error)
                    this.setState(prevState => ({
                        connected: false,
                        error: error.reason,
                    }));
                })

                // this.channel = this.socket.channel("lobby:*", {});
                //
                // this.channel.join()
                //     .receive("ok", resp => {
                //         console.log("Joined successfully", resp)
                //         this.setState(prevState => ({
                //             connected: true,
                //             error: '',
                //         }));
                //     })
                //     .receive("error", resp => {
                //         console.log("Unable to join", resp)
                //         this.setState(prevState => ({
                //             connected: false,
                //             error: resp.reason,
                //         }))
                //     })
            })
            .catch(error => {
                this.socket = null;
                this.channel = null;
                debugger
                this.setState(() => ({
                    connected: false,
                    error: error.reason,
                }));
            })
    }

    // foo = () => {
        // console.log('foo')
    // };
    //
    // subscribe = (message, onReceiveCallback) => {
    //     this.channel.on(message, onReceiveCallback);
    // };
    //
    // createRoom = (newRoomName) => {
    //     // console.log('create room', newRoomName)
    //     this.channel.push("create_room", {name: newRoomName});
    // };
    //
    // getRooms = () => {
    //     this.channel.push("get_rooms", {});
    // };
    //
    // joinRoom = (roomName) => {
    //     this.channel.push("join_room", {name: roomName});
    // };

    joinChannel = (topic, params, onJoinSuccessCallback, onJoinErrorCallback) => {
        const channel = this.socket.channel(topic, params);

        channel.join()
            .receive("ok", onJoinSuccessCallback)
            .receive("error", onJoinErrorCallback)
        return channel;
    };

    render() {
        const {connected} = this.state;

        return connected ?
            (<Provider value={{
                // foo: this.foo,
                // createRoom: this.createRoom,
                // subscribe: this.subscribe,
                // getRooms: this.getRooms,
                // joinRoom: this.joinRoom,
                joinChannel: this.joinChannel,
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
