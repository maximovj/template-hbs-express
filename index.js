require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();

// Configurar variables de entorno
app.set('port', process.env.PORT || process.env.APP_PORT || 4800);
app.set('url', process.env.APP_URL);

// Monitorear endpoints usando morgan
app.use(morgan('dev'));

// Definir rutas de endpoints
app.get('/', (req, res) => {
    return res.json({
        "message": "working"
    });
});

// Configurar archivos estáticos 
app.use(express.static('public'));
app.use('/static', express.static('public'));

// Levantar el servidor
app.listen(app.get('port'), () => {
    console.log(`App corriendo en ${app.get('url')}:${app.get('port')}`);
});
