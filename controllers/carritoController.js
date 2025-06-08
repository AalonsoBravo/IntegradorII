const Carrito = require('../models/carritoModel');
const { validationResult } = require('express-validator');
const Producto = require('../models/productosModel');

const agregarCarrito = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { _id } = req.params;

    try {
        const producto = await Producto.findById(_id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }

        let carrito = await Carrito.findOne();
        if (!carrito) {
            carrito = new Carrito({
                productos: [{ productoId: _id, cantidad: 1 }]
            });
        } else {
            const productoEnCarrito = carrito.productos.find(
                (item) => item.productoId.toString() === _id
            );
            if (productoEnCarrito) {
                // Si ya está, suma 1 a la cantidad
                productoEnCarrito.cantidad += 1;
            } else {
                // Si no está, lo agrega con cantidad 1
                carrito.productos.push({ productoId: _id, cantidad: 1 });
            }
        }

        await carrito.save();
        res.status(200).json({ mensaje: 'Producto agregado al carrito', carrito });
    } catch (error) {
        console.error('Error al agregar al carrito:', error);
        res.status(500).json({ mensaje: 'Error al agregar al carrito' });
    }
};

const vaciarCarrito = async (req, res) => {
    try {
        let carrito = await Carrito.findOne();
        if (carrito) {
            carrito.productos = [];
            await carrito.save();
        }
        res.redirect('/api/carrito/carrito');
    } catch (error) {
        console.error('Error al vaciar el carrito: ', error);
        res.status(500).render('error', {
            error: { msg: 'Error al vaciar el carrito' }
        })
    }
}

module.exports = {
    agregarCarrito,
    vaciarCarrito
};