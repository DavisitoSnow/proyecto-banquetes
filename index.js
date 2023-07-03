const express = require('express');
const conectarDB = require('./db');
var bodyParser = require('body-parser');
var cors = require("cors");

// Creamos el servidor
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Conectamos a la BD
conectarDB()
    .then(() => {
        // Iniciamos el servidor después de conectarnos a la BD
        app.use('/api/productos', require('./rutas/producto'));
        app.use('/api/entradaUs', require('./rutas/entradaUsRuta'));
        app.use('/api/postreUs', require('./rutas/postreUsRuta'));
        app.use('/api/registrar', require('./rutas/rutasUsuario'));
        app.use('/api/iniciar-sesion', require('./rutas/rutasUsuario'));

        app.listen(4000, () => {
            console.log('El servidor está corriendo perfectamente');
        });
    })
    .catch(error => {
        console.log('Error al conectar a la BD:', error);
    });