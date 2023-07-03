'use strict'
var express = require('express');
var entradaControl = require('../controlador/entradaControl');
var md_auth = require('../middleware/autenticar');
var api = express.Router();

var multipart = require('connect-multiparty');
var dir_fotos = multipart({ uploadDir: './fotos/usuario' });

api.post('/insertarEntrada', entradaControl.insertMenuEn);
api.put('/actualizarEntrada/:id', md_auth.validarAcceso, entradaControl.actualizarMenuEn);
api.delete('/borrarEntrada/:id', md_auth.validarAcceso, entradaControl.borrarMenuEn);

module.exports = api;