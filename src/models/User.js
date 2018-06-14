import _ from 'lodash';

export default {
    id: function(user) {
        return _.get(user, 'user_id');
    },
    name: function (user) {
        return _.get(user, 'user');
    },
    isReady: function (user) {
        return _.get(user, 'ready', false);
    }
};
