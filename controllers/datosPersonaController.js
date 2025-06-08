const DatosPersona = require('../models/datosPersonaModel');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
    try {
        const usuarios = await DatosPersona.find();
        console.log(usuarios);
        res.status(200).render('usuarios', {
            usuarios: usuarios
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener los datos');
    }
}

const registrarUsers = async (req, res) =>{
    const erroresValues = validationResult(req);
    if (!erroresValues.isEmpty()){
        return res.status(400). render('contacto', {
            mensaje: erroresValues.array()[0].msg
        });
    }

    const { nombre, email, password, telefono, mensaje } = req.body;
    const datos = {
        nombre,
        email,
        password,
        telefono,
        mensaje
    }
    
    if (!nombre || !email || !password || !telefono) {
        return res.status(400).render('contacto', {
            mensaje: 'Error: Todos los campos son obligatorios'
        });
    }
    
    try {
        const emailExistente = await DatosPersona.find({ email });
        console.log(`Email existente: ${emailExistente}`);
        if (emailExistente.length > 0) {
            return res.status(400).render('contacto', {
                mensaje: 'Error: El email ya está registrado'
            });
        }
        console.log(datos);
        
        const salt = await bcrypt.genSalt(10);
        console.log(`Salt: ${salt}`);
        datos.password = await bcrypt.hash(password, salt);
        console.log(`Password hasheada: ${datos.password}`);
    
        const nuevoDato = new DatosPersona(datos);
        await nuevoDato.save();
        res.status(200).render('respuesta');
        console.log(`Usuario registrado: ${datos.nombre}`);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al guardar los datos');
    }
}

const loginUsers = async (req, res) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': 'El email debe ser un email válido',
            'string.empty': 'El email es obligatorio'
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': 'La contraseña debe tener al menos 6 caracteres',
            'string.empty': 'La contraseña es obligatoria'
        })
    })
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).render('contacto', {
            mensaje: error.details[0].message
        });
    }
    const { email, password } = req.body;
    console.log(`Email: ${email}, Password: ${password}`);

    try {
        const usuario = await DatosPersona.findOne({ email });
        console.log(`Usuario encontrado: ${usuario}`);
        if (!usuario) {
            return res.status(400).render('contacto', {
                mensaje: 'Error: Usuario no encontrado, verificar/registrar usuario'
            });
        }

        const token = jwt.sign(
            {id: usuario._id, email: usuario.email},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        console.log(`Token generado: ${token}`);
        
        res.status(200).cookie('token', token, {httpOnly: true}).render('admin', {
            mensaje: `Bienvenido ${usuario.nombre}, has iniciado sesión correctamente al panel de administración`
        });

    } catch (error) {
        console.log(error);
        res.status(500).render('contacto', {
            mensaje: 'Error al iniciar sesión'
        });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    console.log(`ID del usuario a eliminar: ${id}, usuario: ${req.user}`);
    try {
        const usuario = await DatosPersona.findById({_id: id});
        console.log(`Usuario encontrado: ${usuario}`);
        if (!usuario) {
            return res.status(404).render('login', {
                mensaje: 'Error: Usuario no encontrado'
            });
        }

        await DatosPersona.findByIdAndDelete({_id: id});
        res.status(200).render('login', {
            mensaje: 'Usuario eliminado correctamente'
        });
        console.log(`Usuario eliminado: ${usuario.nombre}`);
    } catch (error) {
        console.log(error);
        return res.status(500).render('login', {
            mensaje: 'Error al eliminar el usuario'
        });
    }
}

module.exports = {
    registrarUsers,
    loginUsers,
    getUsers,
    deleteUser
}
