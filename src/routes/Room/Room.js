import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Room extends Component {
    state = {
        users: [],
    };

    componentDidMount() {
        const {getUsers, subscribe} = this.props;

        subscribe('user_list', ({users}) => {
            this.setState({
                users,
            })
        });

        subscribe('user_joined', ({user}) => {
            this.setState(({users}) => ({
                users: users.concat(user),
            }))
        });

        getUsers();
    }


    render() {
        const {roomName} = this.props;
        const {users} = this.state;

        return (
            <div>
                <div>
                    Joined room {roomName}
                </div>
                {users.map(user => (
                    <div key={user}>
                        {user}
                    </div>
                ))}
            </div>
        );
    }
}

Room.propTypes = {};
Room.defaultProps = {};

export default Room;
