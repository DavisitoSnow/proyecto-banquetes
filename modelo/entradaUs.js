'use strict'
var mongoose = require("mongoose"); //utiliza la libreria mongoose 
var Schema = mongoose.Schema;

var EsquemaEntradaUs = Schema({
    ingredientes: String,
    acompanado: String
});

module.exports = mongoose.model('entradaUsuario', EsquemaEntradaUs); //crea coleccion cancion para exportarla
//con model se tiene que instanciar