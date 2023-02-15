import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES'
export const GET_TYPES = 'GET_TYPES'
export const GET_DATABASE = 'GET_DATABASE'
export const FILTER_BY_ORDER = 'FILTER_BY_ORDER'
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE'
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS'

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

export function getDatabase() {
    return async function (dispatch) {
        try {
            let dataBase = await axios.get('http://localhost:3001/recipes/dates')
            return dispatch({
                type: GET_DATABASE,
                payload: dataBase.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getFilterByDiets(payload){
    return {
        type: FILTER_BY_DIETS,
        payload: payload
    }
}

export function filterByOrder(payload){
    return {
        type: FILTER_BY_ORDER,
        payload: payload
    }
}

export function orderByScore(payload){
    return{
        type: ORDER_BY_SCORE,
        payload: payload
    }
}