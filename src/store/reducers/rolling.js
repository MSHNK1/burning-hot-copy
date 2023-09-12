import * as actionTypes from '../actions/actionTypes';

const initialState = {
    initialRolling: false,
    bet: 0,
};

const reducer = (state = initialState, action) => {
    // console.log("reducershi:", action.initialRolling, action.bet)
    switch (action.type) {
        case actionTypes.INITIATE_ROLLING:
            return {
                ...state,
                initialRolling: true,
                bet: action.bet
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