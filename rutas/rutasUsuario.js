// Rutas para producto
const express = require('express');
const router = express.Router();
const usuarioControl = require('../controlador/usuarioControl');
var md_auth = require('../middleware/autenticar');

// api/productos
router.post('/', usuarioControl.registrarUsuario);
router.put('/:id', md_auth.validarAcceso, usuarioControl.actualizarUsuario);
router.delete('/:id', usuarioControl.eliminarRegistro);
router.get('/', usuarioControl.accesoUsuario);

module.exports = router;