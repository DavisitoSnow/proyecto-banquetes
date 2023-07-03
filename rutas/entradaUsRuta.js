// Rutas para producto
const express = require('express');
const router = express.Router();
const entradaUsControl = require('../controlador/entradaUsControl');

// api/productos
router.post('/', entradaUsControl.insertMenuEn);
router.put('/:id', entradaUsControl.actualizarMenuEn);
router.delete('/:id', entradaUsControl.borrarMenuEn);
router.get('/', entradaUsControl.obtenerProductos);
router.get('/:id', entradaUsControl.obtenerProducto);

module.exports = router;