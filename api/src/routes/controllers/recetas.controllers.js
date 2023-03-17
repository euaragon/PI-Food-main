const axios = require("axios");
const { Op } = require("sequelize");
const { Recipe, Diet, DishTypes } = require("../../db");
const { API_KEY } = process.env; // se desestructura la api key desde el .env para obtener el dato
require("dotenv").config();

const checkRecipe = async (recipe) => {
  const check = await Recipe.findOne({
    where: {
      name: recipe,
    },

  });
  if (!check) return true;
};

const getApiInfo = async (name) => {
  const responseAPI = await axios(
    `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY}`
  );

  let recipes = responseAPI.data.results.map((recipe) => {
    const diets = recipe.diets.length > 1 ? recipe.diets.map(d => `${d[0].toUpperCase()}${d.substring(1)}`) : ["Ninguna"]
    let newRecipe = {
      id: recipe.id,
      name: recipe.title,
      healthScore: recipe.healthScore,
      summary: recipe.summary,
      instructions: recipe.analyzedInstructions,
      image: recipe.image,
      diets: diets,
      dishTypes: recipe.dishTypes.map(d => `${d[0].toUpperCase()}${d.substring(1)}`),
    };

    let instructions = newRecipe.instructions
      .map((i) => i.steps.map((s) => `${s.number}) ${s.step}`).join(" "))
      .join();

    newRecipe.instructions = instructions;

    return newRecipe;
  });

  if (name) {
    recipes = recipes.filter((e) => e.name.includes(name));
  }
  
  return recipes;
};

const getDBInfo = async (name) => {
  let dbQuery = [];
  if (name) {
    dbQuery = await Recipe.findAll({
      where: {
        title: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: DishTypes,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
  } else {
    dbQuery = await Recipe.findAll({
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: DishTypes,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
  }

  return dbNormalizer(dbQuery);
};

const createRecipe = async (obj) => {
  let recipe = await Recipe.create({
    title: obj.title,
    healthScore: obj.healthScore,
    summary: obj.summary,
    steps: obj.instructions,
    image: obj.image,
  });
  return recipe; 
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

const apiByName = async(name) => {
  const responseAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=100&apiKey=${API_KEY}`);
  const nombre = await responseAPI.map((recipe) => {
    return {
      id: recipe.id,
      title: recipe.title,
      healthScore: recipe.healthScore,
      summary: recipe.summary,
      instructions: instructions,
      image: recipe.image,
      diets: recipe.diets || ["Ninguna"],
      dishTypes: recipe.dishTypes,
    }
  }
  
  )
}

const apiById = async (id) => {
  const responseAPI = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  );

  let recipe = responseAPI.data;

  let instructions = recipe.analyzedInstructions
    .map((i) => i.steps.map((s) => `${s.number}) ${s.step}`).join(" "))
    .join();

  return {
    id: recipe.id,
    title: recipe.title,
    healthScore: recipe.healthScore,
    summary: recipe.summary,
    instructions: instructions,
    image: recipe.image,
    diets: recipe.diets || ["-"],
    dishTypes: recipe.dishTypes,
  };
};

const dbById = async (id) => {
  const recipes = await Recipe.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: DishTypes,
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
  let recipes = query.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.title,
      healthScore: recipe.healthScore,
      summary: recipe.summary,
      instructions: recipe.steps,
      image: recipe.image,
      diets: recipe.diets,
      dishTypes: recipe.dishTypes,
    };
  });
  recipes.forEach((recipe) => {
    let mapDiets = recipe.diets.map((e) => e.name);
    recipe.diets = mapDiets;

    let mapDishes = recipe.dishTypes.map((e) => e.name);
    recipe.dishTypes = mapDishes;
  });
  return recipes;
};

const checkAtt = async (att, str) => {
  let check;
  if (str === "diet") {
    check = await Diet.findOne({
      where: {
        name: att,
      },
    });
  }
  if (str === "dish") {
    check = await DishTypes.findOne({
      where: {
        name: att,
      },
    });
  }
  if (str === "recipe") {
    check = await Recipe.findOne({
      where: {
        title: att,
      },
    });
  }
  if (!check) return true;
}

const saveAtt = async (arr, str) => {
  if (str === "diet") {
    for (let diet of arr) {
      if (await checkAtt(diet, "diet")) {
        await Diet.create({ name: diet });
      }
    }
    return;
  }
  if (str === "dish") {
    for (let dish of arr) {
      if (await checkAtt(dish, "dish")) {
        await DishTypes.create({ name: dish });
      }
    }
    return;
  }
}

const attIdSearch = async (arr, str) => {
  if (str === "dishId") {
    let dishIds = [];
    for (dish of arr) {
      let id = await DishTypes.findOne({
        attributes: ["id"],
        where: {
          name: dish,
        },
      });
      dishIds.push(id);
    }
    return dishIds;
  }
  if (str === "dietId") {
    let dietIds = [];
    for (let diet of arr) {
      let id = await Diet.findOne({
        attributes: ["id"],
        where: {
          name: diet,
        },
      });
      dietIds.push(id);
    }
    return dietIds;
  }
}

module.exports = {
  checkRecipe,
  getApiInfo,
  getDBInfo,
  createRecipe,
  saveDiet,
  saveDish,
  dietIdSearch,
  dishIdSearch,
  apiById,
  dbById,
  apiByName, checkAtt, saveAtt, attIdSearch
};
