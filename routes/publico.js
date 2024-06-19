const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/templates', (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'Projeto.html' ,  ); 
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Erro ao enviar o arquivo:', err);
            res.status(err.status || 500).end();
        } else {
            console.log('Arquivo enviado:', filePath);
        }
    });
    
});

module.exports = router;
