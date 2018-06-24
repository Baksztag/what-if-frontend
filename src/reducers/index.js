import * as actionTypes from '../actions';
import _ from 'lodash';

const initialState = {
    test: '',
    isFetching: false,
    error: '',
    history: {
        isFetching: false,
        error: '',
        games: [],
        gameDetails: {},
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
            console.log(action)
            return {
                ...state,
                history: {
                    ...state.history,
                    isFetching: false,
                    games: [
                        ...action.payload.games,
                    ],
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