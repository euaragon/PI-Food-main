const axios = require("axios");
require("dotenv").config();
const { Op } = require("sequelize");
const { Recipe, Diet, DishTypes } = require("../../db");
const { API_KEY } = process.env; // se desestructura la api key desde el .env para obtener el dato

const checkRecipe = async (recipe) => {
  const check = await Recipe.findOne({
    where: {
      name: recipe,
    },
  });
  if (!check) return true;
};

const checkDiet = async (diet) => {
  const check = await Diet.findOne({
    where: {
      name: diet,
    },
  });
  if (!check) return true;
};

const checkDish = async (dish) => {
  const check = await DishTypes.findOne({
    where: {
      name: dish,
    },
  });
  if (!check) return true;
};

const getApiInfo = async (name) => {
 
  
  const apiURL = await axios.get(
    // `https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
    
  );
  const apiInfo = apiURL.data.results.map((recipe) => {
    // mapeamos la info que trae de la API para sacar solamente lo que me hace falta
    const diets = recipe.diets.length > 0 ? recipe.diets : ["Ninguna"];
    return {
      id: recipe.id,
      name: recipe.title,
      summary: recipe.summary,
      healthScore: recipe.healthScore,
      image: recipe.image,
      diets: diets,
      dishTypes: recipe.dishTypes,
      instructions: recipe.analyzedInstructions,
    };
  });
  return apiInfo;
};

const getDBInfo = async (name) => {
  return await Recipe.findAll({
    where: {
      title: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
};

const createRecipe = async (obj) => {
  let recipe = await Recipe.create({
    title: obj.title,
    healthScore: obj.healthScore,
    summary: obj.summary,
    instructions: obj.instructions,
    image: obj.image,
  });
  return recipe; //falta la relacion con las dietas 
};

const saveDiet = async () => {
  for (let diet of arr) {
    if (await checkDiet(diet)) {
      await Diet.create({ name: diet });
    }
  }
  return;
};

const saveDish = async () => {
  for (let dish of arr) {
    if (await checkDish(dish)) {
      await DishTypes.create({ name: dish });
    }
  }
  return;
};

const dietIdSearch = async (arr) => {
  let dietIds = [];
  for (let diet of arr) {
    let id = await Diets.findOne({
      attributes: ["id"],
      where: {
        name: diet,
      },
    });
    dietIds.push(id);
  }
  return dietIds;
};

const dishIdSearch = async (arr) => {
  let dishIds = [];
  for (let dish of arr) {
    let id = await DishTypes.findOne({
      attributes: ["id"],
      where: {
        name: dish,
      },
    });
    dishIds.push(id);
  }
  return dishIds;
};

const apiById = async () => {
  const getApiInfo = await axios(
    `https://api.spoonacular.com/recipes/${id}/information&apiKey=${API_KEY}`
  );

  let recipes = getApiInfo.data.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      healthScore: recipe.healthScore,
      summary: recipe.summary,
      instructions: recipe.analyzedInstructions,
      image: recipe.image,
      diets: recipe.diets,
      dishTypes: recipe.dishTypes,
    };
  });
  return recipes;
};

const dbById = async () => {
  const recipes = await Recipe.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: DishType,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return dbNormalizer([recipes])[0]; //lo ejecutamos como un array y lo devuelvo en su indice 0 porque es una buscqueda de nunico elemento y necesitamos que se ejecute como un array para pasarlo por el dbNormalizer
};

const dbNormalizer = (query) => {
  //normalizamos la query
  let recipes = query.map(recipe => {
    return {
      id: recipe.id,
      title:recipe.title,
      healthScore: recipe.healthScore,
      summary: recipe.summary,
      instructions: recipe.analyzedInstructions,
      image: recipe.image,
      diets: recipe.diets,
      dishTypes: recipe.dishTypes,
    }
  })
  recipes.forEach(recipe => {
    let mapDiets = recipe.diets.map((e) => e.name);
    recipe.diets = mapDiets;

    let mapDishes = recipe.dishTypes.map((e) => e.name);
    recipe.dishTypes = mapDishes;
  });
  return recipes;
}

module.exports = {
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
};
