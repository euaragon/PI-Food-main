const  dietRouter  = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {crearDieta, traerDietas} = require('../controllers/dietas.controllers');

dietRouter.get('/', async(req, res) => {
    try {
        await crearDieta();
        const respose = await traerDietas();
        res.json(respose);
        
    } catch (error) {
        res.status(404).send(error.message)
    }
})



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = dietRouter;

/*

[ ] GET /diets:
Obtener todos los tipos de dieta posibles
En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá



*/