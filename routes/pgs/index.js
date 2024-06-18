const router = require('express').Router();
const gastosRouter = require('./gastos'); // Require the correct module

router.use('/gastos', gastosRouter);

module.exports = router;