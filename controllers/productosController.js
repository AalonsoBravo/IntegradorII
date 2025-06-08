const { validationResult } = require('express-validator');
const Producto = require('../models/productosModel');

const registrarProductos = async (req, res) => {
    const validar = validationResult(req);
    if (!validar.isEmpty()) {
        return res.status(400).render('error', {
            error: validar.array()
        });
    }

    const { nombre, imagen, precio, descripcion} = req.body;
    const producto = {
        nombre,
        imagen,
        precio,
        descripcion
    };

    try {
        const nuevoProducto = new Producto(producto);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error('Error al registrar el producto:', error);
        return res.status(500).render('error', {
            error: { msg: 'Error al registrar el producto' }
        });
    }
}

const eliminarProductos = async (req, res) => {
    const { _id }  = req.params;
    console.log(`ID del producto a eliminar: ${_id}, producto: ${req.body.nombre}`);
    try {
        const producto = await Producto.findById(_id);
        console.log(`Producto encontrado: ${producto}`);
        if (!producto) {
            return res.status(404).render('error', {
                error: { msg: 'Producto no encontrado' }
            });
        }
        await Producto.findByIdAndDelete(_id);
        res.render('respuesta', {
            mensaje: 'Producto eliminado correctamente'
        })
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        return res.status(500).render('error', {
            error: { msg: 'Error al eliminar el producto' }
        });
    }
}

const actualizarProducto = async (req, res) => {
    const { _id } = req.params;
    const { nombre, imagen, precio, descripcion } = req.body;
    try {
        const producto = await Producto.findByIdAndUpdate(_id, {
            nombre,
            imagen,
            precio,
            descripcion
        }, { new: true });
        if (!producto) {
            return res.status(404).render('error', {
                error: { msg: 'Producto no encontrado' }
            });
        }
        res.render('respuesta', {
            mensaje: 'Producto actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        return res.status(500).render('error', {
            error: { msg: 'Error al actualizar el producto' }
        });
    }
}

module.exports = {
    registrarProductos,
    eliminarProductos,
    actualizarProducto
}