const Producto = require('../models/productosModel');
const Carrito = require('../models/carritoModel');

const homeApp =  async (req, res) => {
    try {
        const producto = await Producto.find();
        res.render('index', { producto });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return res.status(500).render('error', {
            error: { msg: 'Error al obtener los productos' }
        });
    }
}

const contactoApp = (req, res) =>{
    res.render('contacto');
}

const altaApp = (req, res) =>{
    res.render('alta');
}

const nosotrosApp = (req, res) => {
    res.render('nosotros');
}

const paginaLogin = (req, res) => {
    res.render('login');
}

const getProductos = async (req, res) =>{
    try {
        const producto = await Producto.find();
        res.render('productos', {producto});
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return res.status(500).render('error', {
            error: { msg: 'Error al obtener los productos' }
        });
    }
}

const mostrarProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        res.render('vistaProducto', { producto });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        return res.status(500).render('error', {
            error: { msg: 'Error al obtener el producto' }
        });
    }
}

const mostrarCarrito = async (req, res) => {
    try {
        const carrito = await Carrito.findOne().populate('productos.productoId');
        if (!carrito || carrito.productos.length === 0) {
            return res.render('carrito', { productos: [], mensaje: 'El carrito está vacío' });
        }
        res.render('carrito', { productos: carrito.productos });
    } catch (error) {
        console.error('Error al mostrar el carrito:', error);
        return res.status(500).render('carrito', {
            productos: [],
            mensaje: 'Error al mostrar el carrito'
        });
    }
};

module.exports = {
    homeApp,
    contactoApp,
    altaApp,
    nosotrosApp,
    paginaLogin,
    getProductos,
    mostrarProducto,
    mostrarCarrito
}