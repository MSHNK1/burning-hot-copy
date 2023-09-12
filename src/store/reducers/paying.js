import * as actionTypes from '../actions/actionTypes';

const initialState = {
    winPrize: 0,
    lastWinPrize: 0,
};

const reducer = (state = initialState, action) => {
    // console.log("reducer:", action.winPrize, action.lastWinPrize);
    switch (action.type) {
        case actionTypes.PAY_PRIZE:
            return {
                ...state, 
                winPrize: action.winPrize,
                lastWinPrize: action.lastWinPrize,
            };
        default:
            return state;
    }
}

export default reducer;