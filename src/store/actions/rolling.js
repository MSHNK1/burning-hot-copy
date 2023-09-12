import * as actionTypes from './actionTypes';

export const initiateRolling = (bet) => {
    return {
        type: actionTypes.INITIATE_ROLLING,
        bet: bet,
    }
}

export const doneRolling = () => {
    return {
        type: actionTypes.DONE_ROLLING,
    }
}