const router = require('express').Router();
const { check } = require('express-validator');

const validarPost = (req, res, next) => {
    const { nombre, email, password, telefono } = req.body;
    if (!nombre || !email || !password || !telefono) {
        return res.status(400).render('contacto', {
            mensaje: 'Error: Todos los campos son obligatorios'
        });
    }
    next();
}

const {
    registrarUsers,
    loginUsers,
    getUsers,
    deleteUser
} = require('../controllers/datosPersonaController');

router.post('/', [
    check('nombre').isString().notEmpty().withMessage('El nombre es obligatorio'),
    check('email').isString().isEmail().withMessage('El email es obligatorio y debe ser un email válido'),
    check('password').isString().isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('telefono').isString().notEmpty().withMessage('El teléfono es obligatorio')
], registrarUsers);

router.get('/traerMongo', getUsers);

router.post('/login', loginUsers);

router.delete('/delete/:id', deleteUser);

module.exports = router;