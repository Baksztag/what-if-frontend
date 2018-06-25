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
                dispatch(setGames(result));
            })
            .catch(error => {
                dispatch(getGamesError(error));
            })
    }
}

export const GET_GAME_DETAILS = 'GET_GAME_DETAILS';

function getGameDetailsStart() {
    return {
        type: GET_GAME_DETAILS,
    };
}

export const SET_GAME_DETAILS = 'SET_GAME_DETAILS';

function setGameDetails(gameId, {data}) {
    return {
        type: SET_GAME_DETAILS,
        payload: {
            gameId,
            gameDetails: data,
        },
    };
}

export const GET_GAME_DETAILS_ERROR = 'GET_GAME_DETAILS_ERROR';

function getGameDetailsError({reason}) {
    return {
        type: GET_GAMES_ERROR,
        payload: {
            error: reason,
        },
    };
}

export function getGameDetails(gameId) {
    return dispatch => {
        dispatch(getGameDetailsStart());
        return API.get(`/game/${gameId}`)
            .then(result => {
                dispatch(setGameDetails(gameId, result));
            })
            .catch(error => {
                dispatch(getGamesError(error))
            });
    };
}

export const DISPLAY_GAME_DETAILS = 'DISPLAY_GAME_DETAILS';

export function displayGameDetails(gameId) {
    return {
        type: DISPLAY_GAME_DETAILS,
        payload: {
            gameId,
        },
    };
}

export const HIDE_GAME_DETAILS = 'HIDE_GAME_DETAILS';

export function hideGameDetails(gameId) {
    return {
        type: HIDE_GAME_DETAILS,
        payload: {
            gameId,
        },
    };
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
