import * as actionTypes from '../actions';

const initialState = {
    test: '',
    isFetching: false,
    error: '',
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
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