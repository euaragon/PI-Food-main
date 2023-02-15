import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES'
export const GET_TYPES = 'GET_TYPES'
export const GET_DATABASE = 'GET_DATABASE'
export const FILTER_BY_TYPE = "FILTER_BY_TYPE"
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE'

export function getRecipes(){
   
    return async function(dispatch){
       try {
        const apiData = await axios.get('http://localhost:3001/recipes');
        const recetas = apiData.data;
        dispatch({
            type: GET_RECIPES,
            payload: recetas,
        })
       } catch (error) {
        alert(error)
       }
    }
}

export function getTypes() {
    return function (dispatch) {
        try {
            axios.get('http://localhost:3001/recipes')
            .then(types => 
                 dispatch({
                type: GET_TYPES,
                payload: types.data
                })
            )
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterRecipesByType(payload){
    return {
        type: FILTER_BY_TYPE,
        payload
    }
}

export function orderByScore(payload){
    return{
        type: ORDER_BY_SCORE,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}