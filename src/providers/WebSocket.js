import React, {Component} from 'react';
import {Socket} from 'phoenix-channels';
import {BrowserRouter} from 'react-router-dom';

import AppRouter from './Router';
import {API} from '../services';

class WebSocketProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            error: '',
        };

        API.getUserToken()
            .then(token => {
                this.socket = new Socket(API.WS_URL);
                this.socket.connect();

                this.channel = this.socket.channel("room:lobby", {params: {token}});
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
                            error: resp,
                        }))
                    })
            })
            .catch(error => {
                this.socket = null;
                this.channel = null;
                this.setState(prevState => ({
                    connected: false,
                    error: error,
                }));
            })
    }

    render() {
        return this.state.connected ?
            (<BrowserRouter>
                <AppRouter/>
            </BrowserRouter>)
            :
            (<div>
                :(
                {this.state.error}
            </div>)
    }
}

WebSocketProvider.propTypes = {};
WebSocketProvider.defaultProps = {};

export default WebSocketProvider;
