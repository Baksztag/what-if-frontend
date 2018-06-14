import React from 'react';
import PropTypes from 'prop-types';

const RoomListElement = ({joinRoom, roomName}) => (
    <div className=""
         onClick={joinRoom(roomName)}
    >
        <span>
            {roomName}
        </span>
    </div>
)

const RoomList = ({joinRoom, rooms}) => (
    <div className="room-list">
        {rooms.map(room => (
            <RoomListElement key={room}
                             roomName={room}
                             joinRoom={joinRoom}
            />
        ))}
    </div>
);

RoomList.propTypes = {
    joinRoom: PropTypes.func.isRequired,
    rooms: PropTypes.array.isRequired,
};
RoomList.defaultProps = {

};

export default RoomList;
