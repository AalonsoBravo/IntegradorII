const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}); 

const Producto = mongoose.model('Producto', productoSchema);

module.exports = Producto; 