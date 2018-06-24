import _ from 'lodash';

export default {
    id: function(game) {
        return _.get(game, 'id');
    },
    roomName: function (game) {
        return _.get(game, 'room_name');
    },
    date: function (game) {
        return _.get(game, 'date');
    }
};
