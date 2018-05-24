import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import {API} from "../../services";
// import {Socket} from "phoenix-channels";

import Room from './Room';

import {webSocketConsumer} from "../../providers/webSocket/webSocketContext";

class RoomChannelProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            error: '',
            occupants: [],
        };

        // API.getUserToken()
        //     .then(token => {
        //         this.socket = new Socket(API.WS_URL, {});
        //         this.socket.connect();
        //
        //         this.channel = this.socket.channel("room:*", {});
        //
        //         this.channel.on('occupants', (payload) => {
        //             this.setState({
        //                 occupants: payload.occupants,
        //             })
        //         });

                // this.channel.on()

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
            // })
            // .catch(error => {
            //     this.socket = null;
            //     this.channel = null;
            //     this.setState(prevState => ({
            //         connected: false,
            //         error: error.reason,
            //     }
            //     ));
            // })
    }

    componentDidMount() {
        // this.channel.push('get_occupants', {name: this.props.roomName});
        const {joinChannel, roomName} = this.props;

        this.channel = joinChannel(`room:${roomName}`, {}, this.onJoinSuccess, this.onJoinError)
    }

    onJoinSuccess = resp => {
        console.log("Joined successfully", resp)
        this.setState(prevState => ({
            connected: true,
            error: '',
        }));
    };

    onJoinError = resp => {
        console.log("Unable to join", resp)
        this.setState(prevState => ({
            connected: false,
            error: resp.reason,
        }))
    };

    subscribe = (message, onReceiveCallback) => {
        this.channel.on(message, onReceiveCallback);
    };

    getUsers = () => {
        this.channel.push('get_users', {});
    };

    render() {
        const {roomName} = this.props;
        const {connected} = this.state;
        return (
            <div>
                {connected ?
                    (<Room roomName={roomName}
                           subscribe={this.subscribe}
                           getUsers={this.getUsers}/>)
                    :
                    (<div>
                        Joining room...
                    </div>)
                }


            </div>
        );
    }
}

RoomChannelProvider.propTypes = {
    roomName: PropTypes.string.isRequired,
};
RoomChannelProvider.defaultProps = {};

export default webSocketConsumer(RoomChannelProvider);
