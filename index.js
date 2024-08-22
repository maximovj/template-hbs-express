require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { create } = require('express-handlebars');
const app = express();

// Configurar variables de entorno
app.set('port', process.env.PORT || process.env.APP_PORT || 4800);
app.set('url', process.env.APP_URL);

// Monitorear endpoints usando morgan
app.use(morgan('dev'));

// Crear motor de plantilla 
const hbs = create({
    extname: '.hbs',
    defaultLayout: false,
});

// Configurar handlebars como motor de plantilla
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', 'views');

// Definir rutas de endpoints
app.get('/', (req, res) => {
    return res.render('home');
});

// Configurar archivos estáticos 
app.use(express.static('public'));
app.use('/static', express.static('public'));

// Levantar el servidor
app.listen(app.get('port'), () => {
    console.log(`App corriendo en ${app.get('url')}:${app.get('port')}`);
});
