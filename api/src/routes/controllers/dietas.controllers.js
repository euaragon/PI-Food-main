require("dotenv").config();
import axios from "axios";
import { Diets } from "../../db";

const { API_KEY } = process.env;

const traerDietaApi = async () => {
    const responseAPI = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    );
    let diets = responseAPI.data.results.map((recipe) => recipe.diets).flat(2).map(d => `${d[0].toUpperCase()}${d.substring(1)}`);
  
    return diets;
  }
  
const traerDietaDB = async () => {
    let dbQuery = await Diets.findAll({
      attributes: ["name"],
    });
  
    let diets = dbQuery.map((diet) => diet.dataValues.name);
  
    return diets;
  }

const crearDieta = async () => {

    let dbDiets = await traerDietaDB();

    if (dbDiets.length === 0) {
        let basicDiets = [
          { name: "Gluten free" },
          { name: "Ketogenic" },
          { name: "Vegan" },
          { name: "Vegetarian" },
          { name: "Lacto-Vegetarian" },
          { name: "Ovo-Vegetarian" },
          { name: "Pescatarian" },
          { name: "Paleo" },
          { name: "Primal" },
          { name: "Low FODMAP" },
          { name: "Whole30" },
        ];
        return await Diets.bulkCreate(basicDiets); // es un metodo de sequelize para insertar varios registros en una tabla de base de datos de un solo saque. Mete el array de objetos que declaramos antes en la DB
      } else return;
}

const traerDietas = async () => {
    const apiDiets = await traerDietaApi();
    const dbDiets = await traerDietaDB();
  
    let diets = apiDiets.concat(dbDiets).flat(2);
  
    let setDiets = new Set(diets);
  
    return [...setDiets];
  }

export default {crearDieta, traerDietas}