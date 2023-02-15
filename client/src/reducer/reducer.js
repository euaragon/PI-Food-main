import { GET_TYPES, GET_RECIPES } from "../actions/actions";

const initialState = {
    recipes: [],
}

function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: payload,
                recipesAll: payload
            }
        
            case GET_TYPES:
                return{
                    ...state,
                    type: payload
                }
                default: return state
}
}
export default rootReducer;