const router = require('express').Router();

const { check } = require('express-validator');

const { 
    registrarProductos,
    actualizarProducto,
    eliminarProductos
} = require('../controllers/productosController');

router.post('/',[
    check('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    check('precio').isNumeric().withMessage('El precio debe ser un número'),
    check('imagen').notEmpty().withMessage('La imagen es obligatoria')
], registrarProductos);

router.post('/eliminarProducto/:_id', eliminarProductos);

router.post('/actualizarProducto/:_id', actualizarProducto);
// router.get();

module.exports = router;