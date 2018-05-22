import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {API} from "../../services";
import {Socket} from "phoenix-channels";

class Room extends Component {
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

                this.channel = this.socket.channel("room:*", {});

                this.channel.on("ok", payload => {
                    console.log(payload.body)
                    // let messageItem = document.createElement("li")
                    // messageItem.innerText = `[${Date()}] ${payload.body}`
                    // messagesContainer.appendChild(messageItem)
                });

                this.channel.on("error", payload => {
                    console.log(payload)
                });

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

    render() {
        return (
            <div>
                Joined room
                {this.props.roomName}
            </div>
        );
    }
}

Room.propTypes = {
    roomName: PropTypes.string.isRequired,
};
Room.defaultProps = {};

export default Room;
