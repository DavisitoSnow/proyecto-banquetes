'use strict'
var mongoose = require("mongoose"); //utiliza la libreria mongoose 
var Schema = mongoose.Schema;

var EsquemaPostreUs = Schema({
    ingredientes: String,
    acompanado: String
});

module.exports = mongoose.model('postreUsuario', EsquemaPostreUs); //crea coleccion cancion para exportarla
//con model se tiene que instanciar