import React, {Component} from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

class LogoutButton extends Component {
    onLogout = () => {
        firebase.auth().signOut();
    };

    render() {
        const {className} = this.props;

        return (
            <button className={className}
                    onClick={this.onLogout}>
                Sign out
            </button>
        );
    }
}

LogoutButton.propTypes = {
    className: PropTypes.string,
};
LogoutButton.defaultProps = {
    className: '',
};

export default LogoutButton;
