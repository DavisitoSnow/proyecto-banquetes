'use strict'
var express = require('express');
var postreControl = require('../controlador/postreControl');
var md_auth = require('../middleware/autenticar');
var api = express.Router();

var multipart = require('connect-multiparty');
var dir_fotos = multipart({ uploadDir: './fotos/usuario' });

api.post('/insertarPostre', postreControl.insertMenuPo);
api.put('/actualizarPostre/:id', md_auth.validarAcceso, postreControl.actualizarMenuPo);
api.delete('/borrarPostre/:id', md_auth.validarAcceso, postreControl.borrarMenuPo);

module.exports = api;