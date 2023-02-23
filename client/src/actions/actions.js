import axios from 'axios';
export const GET_RECIPES = 'GET_RECIPES'
export const GET_DATABASE = 'GET_DATABASE'
export const FILTER_BY_TYPE = "FILTER_BY_TYPE"
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE'
export const GET_DETAILS = 'GET_DETAILS'
export const GET_NAME = 'GET_NAME'


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

export function getDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({
                type: GET_DETAILS,
                payload:json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getName(name){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/recipes?name=${name}`);

            return dispatch({
                type: GET_NAME,
                payload: response.data
            })
        } catch (error) {
            console.log("Coloque algo senior");
        }
    }
}

export function postRecipes(payload){
    return async function(dispatch) {
        try {
            const response = await axios.post(`http://localhost:3000/recipe`, payload)
            return response

        }catch(error){
            console.log(error);
        }
    }
}
