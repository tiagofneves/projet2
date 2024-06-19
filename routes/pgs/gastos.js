const gastosRouter = require('express').Router();
const controller = require('../../controllers/pgs/gastos');

//testa a ligação à BD
gastosRouter.get('/testeConn', controller.testConnection); 

//CRUD para carros
gastosRouter.get('/', controller.getAll); //le todos
gastosRouter.get('/:id', controller.getById); //le um carro indicado pelo id
gastosRouter.post('/create', controller.create); //criar um carro
gastosRouter.put('/update', controller.update); //atualizar um carro
gastosRouter.delete('/delete/:id', controller.delete); //apagar um carro


module.exports = gastosRouter;
