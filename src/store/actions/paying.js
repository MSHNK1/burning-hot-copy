import * as actionTypes from './actionTypes';

export const payPrize = (winPrize, lastWinPrize) => {
    console.log("actions:", winPrize, lastWinPrize)
    return {
        type: actionTypes.PAY_PRIZE,
        winPrize: winPrize,
        lastWinPrize: lastWinPrize,
    }
}