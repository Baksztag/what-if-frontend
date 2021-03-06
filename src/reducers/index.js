import * as actionTypes from '../actions';
import _ from 'lodash';

import {Game} from '../models';

const initialState = {
    test: '',
    isFetching: false,
    error: '',
    history: {
        isFetching: false,
        error: '',
        games: {},
        gameDetails: {
            error: '',
            details: {},
            id: 0,
            isFetching: false,
        },
    },
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_GAMES:
            return {
                ...state,
                history: {
                    ...state.history,
                    isFetching: false,
                },
            };
        case actionTypes.GET_GAMES_ERROR:
            return {
                ...state,
                history: {
                    ...state.history,
                    isFetching: false,
                    error: action.payload.error,
                },
            };
        case actionTypes.SET_GAMES:
            const gamesMap = _.reduce(action.payload.games, (reducedGames, game) => {
                reducedGames[Game.id(game)] = game;

                return reducedGames;
            }, {});

            return {
                ...state,
                history: {
                    ...state.history,
                    isFetching: false,
                    games: gamesMap,
                },
            };
        case actionTypes.GET_GAME_DETAILS:
            return {
                ...state,
                history: {
                    ...state.history,
                    gameDetails: {
                        ...state.history.gameDetails,
                        isFetching: true,
                    },
                }
            };
        case actionTypes.GET_GAME_DETAILS_ERROR:
            return {
                ...state,
                history: {
                    ...state.history,
                    gameDetails: {
                        ...state.history.gameDetails,
                        error: action.payload.error,
                        isFetching: false,
                    },
                },
            };
        case actionTypes.SET_GAME_DETAILS:
            return {
                ...state,
                history: {
                    ...state.history,
                    gameDetails: {
                        ...state.history.gameDetails,
                        error: '',
                        isFetching: false,
                        details: {
                            ...state.history.gameDetails.details,
                            [action.payload.gameId]: action.payload.gameDetails,
                        },
                    },
                },
            };
        case actionTypes.DISPLAY_GAME_DETAILS:
            return {
                ...state,
                history: {
                    ...state.history,
                    gameDetails: {
                        ...state.history.gameDetails,
                        id: action.payload.gameId,
                    },
                },
            };
        case actionTypes.HIDE_GAME_DETAILS:
            return {
                ...state,
                history: {
                    ...state.history,
                    gameDetails: {
                        ...state.history.gameDetails,
                        id: '',
                    },
                },
            };
        case actionTypes.GET_TEST:
            return {
                ...state,
                isFetching: true,
                test: '',
                error: '',
            };
        case actionTypes.SET_TEST:
            return {
                ...state,
                isFetching: false,
                test: action.payload.test,
                error: '',
            };
        case actionTypes.GET_TEST_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.payload.error,
            };
        default:
            return state;
    }
};

export default rootReducer;