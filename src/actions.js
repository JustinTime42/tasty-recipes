import { SET_SPECIALS } from "./constants"

export const setSpecials = (specials) => {
    return {
        type: SET_SPECIALS,
        payload: specials  
    }      
}