const router = require('express').Router();

const {
    agregarCarrito,
    vaciarCarrito
} = require('../controllers/carritoController');

router.post('/agregarAlCarrito/:_id', agregarCarrito);

router.post('/vaciarCarrito', vaciarCarrito);

module.exports = router;