require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const routerLocal = require('./routes/local/index');
const routerPgs = require('./routes/pgs/index');
const publicoRouter = require('./routes/publico');
const privadoRouter = require('./routes/privado');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota padrão para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'frontEnd', 'Projeto.html'));
});

// Rotas da aplicação
app.use('/', publicoRouter);
app.use('/bo/', privadoRouter);
app.use('/api/local/', routerLocal);
app.use('/api/pgs/', routerPgs);

const port = process.env.SERVER_PORT || 8080;
app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
