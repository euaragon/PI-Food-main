const  dietRouter  = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

dietRouter.get('/', (req, res) => {
    try {
        const { name } = req.query;
        
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