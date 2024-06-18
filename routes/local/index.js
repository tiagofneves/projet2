const router = require('express').Router();
const gastosRouter = require('./gastos');

router.use('/gastos', gastosRouter);

module.exports = router;