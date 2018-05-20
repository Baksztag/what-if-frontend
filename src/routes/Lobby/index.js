import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Lobby extends Component {
    render() {
        console.log(this.props)

        return (
            <div>
                LOBBY XD
            </div>
        );
    }
}

Lobby.propTypes = {};
Lobby.defaultProps = {};

export default Lobby;
