import * as actionTypes from '../actions/actionTypes';

const initialState = {
    initialRolling: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INITIATE_ROLLING:
            return {
                ...state,
                initialRolling: true
            };
        case actionTypes.DONE_ROLLING:
            return {
                ...state,
                initialRolling: false
            }
        default:
            return state;
    }
}

export default reducer;