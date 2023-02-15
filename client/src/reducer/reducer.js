import {
  GET_TYPES,
  GET_RECIPES,
  FILTER_BY_TYPE,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
} from "../actions/actions";

const initialState = {
  recipes: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: payload,
        recipesAll: payload,
      };

    case GET_TYPES:
      return {
        ...state,
        type: payload,
      };

    case FILTER_BY_TYPE:
      const recipes_All = state.recipes;

      const typeFilter =
        payload === "Tipo"
          ? state.recipes
          : recipes_All.filter((recipe) => {
              if (recipe.diets.length > 0) {
                if (recipe.diets.find((element) => element === payload))
                  return recipe;
              }
            });
      return {
        ...state,
        recipes: typeFilter,
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

    default:
      return state;
  }
}
export default rootReducer;
