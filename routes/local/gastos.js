const gastosRouter = require('express').Router();
const controller = require('../../controllers/local/gastos');

// Rotas para Gerenciamento de Gastos
gastosRouter.get('/', controller.getAll); // Lista todos os gastos
gastosRouter.get('/:id', controller.getById); // Obtém um gasto pelo ID
gastosRouter.post('/novo', controller.create); // Cria um novo registro de gasto
gastosRouter.put('/:id/atualizar', controller.update); // Atualiza um gasto existente
gastosRouter.delete('/:id/apagar', controller.delete); // Apaga um gasto pelo ID

module.exports = gastosRouter;