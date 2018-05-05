import _ from 'lodash';

import {API} from '../services';

export const GET_TEST = 'GET_TEST';

export function getTest() {
    return dispatch => {
        dispatch(getTestStart());
        return API.get('/test')
            .then(result => {
                dispatch(setTest(result.data));
            })
            .catch(error => {
                dispatch(getTestError(_.get(error, 'message', 'error')));
            })
    }
}

export const SET_TEST = 'SET_TEST';
function setTest(test) {
    return {
        type: SET_TEST,
        payload: {
            test,
        },
    }
}

export const GET_TEST_ERROR = 'GET_TEST_ERROR';
function getTestError(error) {
    return {
        type: GET_TEST_ERROR,
        payload: {
            error
        },
    }
}

export function getTestStart() {
    return {
        type: GET_TEST,
    }
}
