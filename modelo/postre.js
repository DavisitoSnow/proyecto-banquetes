'use strict'
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaPostre = Schema({
    nombre: { type: Schema.Types.ObjectId, ref: 'postreUs' },
    descripcion: String,
    imagen: String,
});

module.exports = mongoose.model('Postre', EsquemaPostre);