require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { create } = require('express-handlebars');
const app = express();
const routes = require('./routes.js');
const helpers = require('./helpers.js');
const path = require('path');

// Configurar variables de entorno
app.set('port', process.env.PORT || process.env.APP_PORT || 4800);
app.set('url', process.env.APP_URL);

// Monitorear endpoints usando morgan
app.use(morgan('dev'));

// Crear motor de plantilla 
const hbs = create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers
});

// Configurar handlebars como motor de plantilla
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Definir rutas de endpoints
app.use(routes);

// Configurar archivos estáticos 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));

// Levantar el servidor
app.listen(app.get('port'), () => {
    console.log(`App corriendo en ${app.get('url')}:${app.get('port')}`);
});