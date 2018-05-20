import React, {Component} from 'react';
import {Socket} from 'phoenix-channels';
import {BrowserRouter} from 'react-router-dom';

import AppRouter from './Router';
import {API} from '../services';

class WebSocketProvider extends Component {


    componentDidMount() {
        API.getUserToken()
            .then(token => {
                this.socket = new Socket(API.WS_URL);
                this.socket.connect();

                let channel = this.socket.channel("room:lobby", {params: {token}});
                channel.join()
                    .receive("ok", resp => { console.log("Joined successfully", resp) })
                    .receive("error", resp => { console.log("Unable to join", resp) })
            })
            .catch(error => {
                this.socket = null;
            })
    }

    render() {
        return !!this.socket ?
            (<BrowserRouter>
                <AppRouter/>
            </BrowserRouter>)
            :
            (<div>
                :(
            </div>)
    }
}

WebSocketProvider.propTypes = {};
WebSocketProvider.defaultProps = {};

export default WebSocketProvider;
