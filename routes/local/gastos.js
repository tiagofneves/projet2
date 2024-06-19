const gastosRouter = require('express').Router();
const controller = require('../../controllers/local/gastos');


gastosRouter.get('/', controller.getAll); 
gastosRouter.get('/:id', controller.getById); 
gastosRouter.post('/novo', controller.create); 
gastosRouter.put('/:id/atualizar', controller.update); 
gastosRouter.delete('/:id/apagar', controller.delete); 

module.exports = gastosRouter;