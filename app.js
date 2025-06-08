
const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'), (err) => {
    if (err) {
        console.log('Ocurrió un error en los partials: ', err);
    }
});

const pagesRouter = require('./routes/pagesRouter');
const apiRouter = require('./routes/datosPersonaRouter');
const productosRouter = require('./routes/productosRouter');
const carritoRouter = require('./routes/carritoRouter');

app.use('/', pagesRouter);
app.use('/api', apiRouter);
app.use('/api/productos', productosRouter);
app.use('/api/carrito', carritoRouter);

//middleware para errores
app.use((req, res) => {
    console.log('ruta no encontrada');
    res.status(404).send('<h1>404 - Ruta no encontrada</h1>');
});
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('<h1>500 - Error interno del servidor</h1>');
});


module.exports = app;