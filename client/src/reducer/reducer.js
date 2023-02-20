import {
  GET_TYPES,
  GET_RECIPES,
  FILTER_BY_TYPE,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  GET_DETAILS,
  GET_NAME,
} from "../actions/actions";

const initialState = {
  recipes: [],
  recetasTotal: [],
  detail: [],
  type: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        recetasTotal: payload,
      };

    case GET_TYPES:
      return {
        ...state,
        type: payload,
      };

    case FILTER_BY_TYPE:
      if(payload === "Todos"){
        return {
          ...state,
          recetasTotal: state.recipes,
        };
      } 
        return {
          ...state,
          recetasTotal: state.recipes.filter(e => e.diets.includes(payload)),
        };
  
      
      
    case ORDER_BY_NAME:
      let sortedArr =
        payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        recipes: sortedArr,
      };

    case ORDER_BY_SCORE:
      let scoreArr = payload === "mas" ?
      state.recipes.sort(function (a, b) {
        if (a.healthScore > b.healthScore) return -1;
        if (a.healthScore < b.healthScore) return 1;
        return 0;
      }) :
      state.recipes.sort(function (a, b) {
        if (a.healthScore > b.healthScore) return 1;
        if (a.healthScore < b.healthScore) return -1;
        return 0;
      })
      return {
        ...state,
        recipes: scoreArr,
      };
      case GET_DETAILS:
        return{
          ...state,
          detail: payload
        }
        case GET_NAME:
          return{
            ...state,
            recipes: payload,
            recetasTotal: payload
          }
    default:
      return state;
  }
}
export default rootReducer;
