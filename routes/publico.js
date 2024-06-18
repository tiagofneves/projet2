const express = require('express');
const router = express.Router();
const path = require('path');

// Rota para servir um arquivo específico
router.get('/gastos', (req, res) => {
    const filePath = path.join(__gastos, '..', 'public', 'Projeto.html'); // ajuste este caminho conforme necessário
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Erro ao enviar o arquivo:', err);
            res.status(err.status).end();
        } else {
            console.log('Arquivo enviado:', filePath);
        }
    });
});

module.exports = router;
