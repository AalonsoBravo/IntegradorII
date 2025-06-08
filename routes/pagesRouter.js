const router = require('express').Router();
const {
    homeApp,
    contactoApp,
    altaApp,
    nosotrosApp,
    paginaLogin,
    getProductos,
    mostrarProducto,
    mostrarCarrito
} = require('../controllers/controllersRouter');

router.get('/', homeApp);

router.get('/contacto', contactoApp);

router.get('/alta', altaApp);

router.get('/nosotros', nosotrosApp);

router.get('/login', paginaLogin);

router.get('/api/productos', getProductos);

router.get('/api/productos/verProducto/:id', mostrarProducto);

router.get('/api/carrito/carrito', mostrarCarrito)

module.exports = router;