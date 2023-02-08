const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dietRouter = require('../routes/middlewares/diets')
const recipeRouter = require('../routes/middlewares/recipes')

const router = Router();

router.use('/recipes', recipeRouter)
router.use('/diets', dietRouter)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
