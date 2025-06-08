const mongoose = require('mongoose');

const personaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    mensaje: {
        type: String,
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
});

const Persona = mongoose.model('Contacto', personaSchema);
module.exports = Persona;