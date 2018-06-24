import React from 'react';
import PropTypes from 'prop-types';

import {User} from '../../../models';

const RoomUserList = ({users}) => (
    <ul className="room-user-list">
        {users.map(user => (
            <li key={User.id(user)}>
                <span className="room-user">
                    {User.name(user)}
                </span>
                {User.isReady(user) && (
                    <span className="room-user-ready">
                        (ready)
                    </span>
                )}
            </li>
        ))}
    </ul>
);

RoomUserList.propTypes = {
    users: PropTypes.array.isRequired,
};
RoomUserList.defaultProps = {};

export default RoomUserList;
