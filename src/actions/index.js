import _ from 'lodash';

import {API} from '../services';

export const GET_GAMES = 'GET_GAMES';
function getGamesStart() {
    return {
        type: GET_GAMES,
    };
}

export const SET_GAMES = 'SET_GAMES';
function setGames({data: {games}}) {
    return {
        type: SET_GAMES,
        payload: {
            games,
        },
    };
}

export const GET_GAMES_ERROR = 'GET_GAMES_ERROR';
function getGamesError({reason}) {
    return {
        type: GET_GAMES_ERROR,
        payload: {
            error: reason,
        },
    };
}

export function getGames() {
    return dispatch => {
        dispatch(getGamesStart());
        return API.get('/games')
            .then(result => {
                console.log(result)
                dispatch(setGames(result));
            })
            .catch(error => {
                dispatch(getGamesError(error));
            })
    }
}

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
