const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.render('home', {
        title_page: 'Inicio',
    });
});

router.get('/projects', (req, res) => {
    return res.render('projects', {
        title_page: 'Proyectos',
        projects: [
            { id: 0, title: 'Proyecto de NodeJS', description: 'App de notas', tags: ['react', 'js'] },
            { id: 1, title: 'Proyecto de Laravel', description: 'App de notas', tags: ['laravel', 'php', 'laravel backpack'] },
            { id: 2, title: 'Proyecto de SpringBoot', description: 'API de empleados', tags: ['springboot'] },
        ]
    });
});

router.get('/profile', (req, res) => {
    return res.render('profile', {
        title_page: 'Perfil',
        user: {
            name: 'Diego',
            lastname: 'Pérez',
            age: 31,
            sex: 'Masculino',
            posts: 70,
            followers: 2400,
            isAdmin: false,
            isLive: false,
            isLogin: true,
        }
    });
});

module.exports = router;