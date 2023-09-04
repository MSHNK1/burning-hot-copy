import * as actionTypes from './actionTypes';

export const initiateRolling = () => {
    return {
        type: actionTypes.INITIATE_ROLLING,
    }
}

export const doneRolling = () => {
    return {
        type: actionTypes.DONE_ROLLING,
    }
}