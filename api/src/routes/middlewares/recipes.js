const recipeRouter = require("express").Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Recipe, Diet, DishTypes } = require("../../db");
require("dotenv").config();
const { API_KEY } = process.env; // se desestructura la api key desde el .env para obtener el dato

recipeRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let recipes = [];
    // traer la info de la API

    let responseAPI = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    );

    if (responseAPI) {
      recipes = responseAPI.data.results.map((recipe) => {
        return {
          id: recipe.id,
          name: recipe.title,
          summary: recipe.summary,
          healthScore: recipe.healthScore,
          image: recipe.image,
          diets: recipe.diets,
          dishTypes: recipe.dishTypes,
          instructions: recipe.analyzedInstructions,
        };
      });
      //    let responseDB = await Recipe.findAll({
      //         where: {
      //         title: {
      //             [Op.iLike]: `%${name}%`,
      //         }},
      //     });

      //     recipes = recipes.concat(responseDB);
    }
    res.status(200).send(recipes);
  } catch (error) {
    res.status(404).send("No se encontraron recetas con ese nombre");
  }
});

module.exports = recipeRouter;

/*
[ ] GET /recipes?name="...":
Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
Si no existe ninguna receta mostrar un mensaje adecuado

[ ] GET /recipes/{idReceta}:
Obtener el detalle de una receta en particular
Debe traer solo los datos pedidos en la ruta de detalle de receta
Incluir los tipos de dieta asociados

[ ] POST /recipes:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
Crea una receta en la base de datos relacionada con sus tipos de dietas.


*/
