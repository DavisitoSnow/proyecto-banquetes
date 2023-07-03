'use strict'
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Esquemausuarios = Schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    rol: String,
    imagen: String
});

module.exports = mongoose.model("Usuarios", Esquemausuarios);