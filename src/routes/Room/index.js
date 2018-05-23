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
    }


    render() {
        return (
            <div>
                Joined room {this.props.roomName}
                <div>
                    {this.state.occupants.map(occupant => (
                        <div key={occupant}>
                            {occupant}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

Room.propTypes = {
    roomName: PropTypes.string.isRequired,
};
Room.defaultProps = {};

export default Room;
