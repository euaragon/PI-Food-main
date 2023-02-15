const recipeRouter = require("express").Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
  checkRecipe,
  checkDiet,
  checkDish,
  getApiInfo,
  getDBInfo,
  createRecipe,
  saveDiet,
  saveDish,
  dietIdSearch,
  dishIdSearch,
  apiById,
  dbById,
} = require("../controllers/recetas.controllers.js");

recipeRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    // traer la info de la API

    const dbRecipes = await getDBInfo(name);
    const apiRecipes = await getApiInfo(name);
    if (!apiRecipes && !dbRecipes) throw Error("No existen recetas");

    const infoTotal = apiRecipes.concat(dbRecipes);

    res.status(200).send(infoTotal);
  } catch (error) {
    res.status(404).send("No se encontraron recetas con ese nombre");
  }
});

recipeRouter.get("/:idRecipe", async (req, res) => {
  try {
    const { idRecipe } = req.params;
    let recipe = {};
    if (Boolean(Number(idRecipe))) { //aca lo que hago es ver desde donde sale el ID, entonces preguntamos si el ID es solo un numero, toma la info de la API. En cambio, si el ID tiene letras y numeros, nos va a dar false y va a tomar la info de la DB
      recipe = await apiById(idRecipe);
    } else {
      recipe = await dbById(idRecipe);
    }
    res.json(recipe);
  } catch (error) {
    res.status(404).send("No existe receta con ese ID");
  }
});

recipeRouter.post("/", async (req, res) => {
  try {
    const {
      title,
      summary,
      healthScore,
      image,
      diets,
      dishTypes,
      instructions,
    } = req.body;

    if (!title || !summary) throw Error("Faltan datos");

    let ArrayDieta = diets.split(",").map((e) => e.trim());
    let ArrayDish = dishTypes.split(",").map((e) => e.trim());

    let recipe = { title, healthScore, summary, instructions, image };

    if (await checkRecipe(title, "recipe")) {
      let creado = await createRecipe(recipe); //creamos la receta, guardamos el registro ya creado

      await saveDiet(ArrayDieta, "diet");
      await saveDish(ArrayDish, "dish");

      await creado.addDiet(await dietIdSearch(ArrayDieta, "dietId")); // addDiet y addDishTypes son metodos de los modelos, se usan con un registro que hayas creado y se vinculan a la tabla de Diets y a la tabla de DishType. Basicamente te vincula esa instancia creada con los valores del modelo que le indicas con el add o el set
      await creado.addDishTypes(await dishIdSearch(ArrayDish, "dishId")); // vinculamos con la receta creada
    } else throw Error("La receta ya existe en la base de datos");

    res.status(201).send(`La receta ${title} se ha creado correctamente`);
  } catch (error) {
    res.status(400).send(error.message);
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
