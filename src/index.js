require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { create } = require('express-handlebars');
const app = express();
const path = require('path');

// Configurar variables de entorno
app.set('port', process.env.PORT || process.env.APP_PORT || 4800);
app.set('url', process.env.APP_URL);

// Monitorear endpoints usando morgan
app.use(morgan('dev'));

// Crear motor de plantilla 
const blocks = {};
const hbs = create({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers: {
        ExCompare: (valueA, operator, valueB, options) => {
            let result = false;
            switch (operator) {
                case '<': result = valueA < valueB; break;
                case '>': result = valueA > valueB; break;
                case '<=': result = valueA <= valueB; break;
                case '>=': result = valueA >= valueB; break;
                case '==': result = valueA == valueB; break;
                case '!==': result = valueA !== valueB; break;
                case '===': result = valueA === valueB; break;
            }
            return result ? options.fn(this) : options.inverse(this);
        },
        yield: function (name, options) {
            if (!blocks[name]) {
                blocks[name] = [];
            }

            if (options.fn) {
                blocks[name].push(options.fn(this));
            }
            return null;
        },
        yieldFor: function (name) {
            const val = (blocks[name] || []).join("\n");
            blocks[name] = [];
            return val;
        }
    }
});

// Configurar handlebars como motor de plantilla
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Definir rutas de endpoints
app.get('/', (req, res) => {
    return res.render('home', {
        title_page: 'Inicio',
    });
});

app.get('/projects', (req, res) => {
    return res.render('projects', {
        title_page: 'Proyectos',
        projects: [
            { id: 0, title: 'Proyecto de NodeJS', description: 'App de notas', tags: ['react', 'js'] },
            { id: 1, title: 'Proyecto de Laravel', description: 'App de notas', tags: ['laravel', 'php', 'laravel backpack'] },
            { id: 2, title: 'Proyecto de SpringBoot', description: 'API de empleados', tags: ['springboot'] },
        ]
    });
});

app.get('/profile', (req, res) => {
    return res.render('profile', {
        title_page: 'Perfil',
        user: {
            name: 'Diego',
            lastname: 'Pérez',
            age: 31,
            genere: 'Masculino',
            posts: 70,
            followers: 2400,
            isAdmin: false,
            isLive: false,
            isLogin: true,
        }
    });
});

// Configurar archivos estáticos 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));

// Levantar el servidor
app.listen(app.get('port'), () => {
    console.log(`App corriendo en ${app.get('url')}:${app.get('port')}`);
});
