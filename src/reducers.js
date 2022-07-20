
import { SET_SPECIALS } from "./constants"

const initialStateSetSpecials = {
    specials: []
}

export const setSpecials = (state=initialStateSetSpecials, action={}) => {
    switch(action.type) {
        case SET_SPECIALS:
            return {...state, specials: action.payload }
        default:
            return state 

    }
}

