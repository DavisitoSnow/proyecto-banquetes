'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var usuario_ruta = require('./rutas/rutasUsuario.js');
var artista_ruta = require('./rutas/artistaRuta.js');
var album_ruta = require('./rutas/albumRuta.js');
var entradaUs_ruta = require('./rutas/entradaUsRuta.js');
var cors = require('cors');
var postreUs_ruta = require('./rutas/postreUsRuta.js');


var app = express();
app.use(cors());
//var user_routes = require('./rutas/rutasUsuario');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', entradaUs_ruta);
app.use('/api', postreUs_ruta);
app.use('/api', usuario_ruta);
app.use('/api', artista_ruta);
app.use('/api', album_ruta);
//configurar cabeceras http

// rutas base
//app.use('/api', user_routes);
//app.get('/pruebas', function(req, res) {
//    res.status(200).send({ mesage: 'Bienvenido  al curso Ivan Azamar' });
//});

module.exports = app;