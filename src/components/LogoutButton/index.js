import React, {Component} from 'react';
import firebase from 'firebase';

class LogoutButton extends Component {
    onLogout = () => {
        firebase.auth().signOut();
    };

    render() {
        return (
            <button onClick={this.onLogout}>
                Sign out
            </button>
        );
    }
}

LogoutButton.propTypes = {};
LogoutButton.defaultProps = {};

export default LogoutButton;
