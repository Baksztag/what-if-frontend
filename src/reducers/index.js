import {GET_TEST} from '../actions';

const initialState = {
    test: '',
    isFetching: false,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TEST:
            return {
                ...state,
                isFetching: true,
            };
        default:
            return state;
    }
};

export default rootReducer;