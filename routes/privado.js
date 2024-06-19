const path = require('path');
const express = require('express');
const privadoRouter = express.Router();

// Define uma rota para a página HTML
//privadoRouter.get('/perfil.html', (req, res) => {
  // Use o método path.join para resolver o caminho absoluto do arquivo HTML
  //res.sendFile(path.join(__dirname, '../backOffice' ,'perfil.html'));
//});

module.exports = privadoRouter;