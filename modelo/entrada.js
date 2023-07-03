//use strict significa que las variabes deben ser declaradas completas 
'use strict'
var mongoose = require("mongoose"); //utiliza la libreria mongoose 
var Schema = mongoose.Schema;

var EsquemaEntrada = Schema({
    nombre: { type: Schema.Types.ObjectId, ref: 'entradaUs' },
    ingredientes: String,
    acompanado: String
});

module.exports = mongoose.model('Entrada', EsquemaEntrada); //crea coleccion cancion para exportarla
//con model se tiene que instanciar