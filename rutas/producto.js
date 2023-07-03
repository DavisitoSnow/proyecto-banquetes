// Rutas para producto
const express = require('express');
const router = express.Router();
const productoControl = require('../controlador/productoControl');

// api/productos
router.post('/', productoControl.crearProducto);
router.get('/', productoControl.obtenerProductos);
router.put('/:id', productoControl.actualizarProducto);
router.get('/:id', productoControl.obtenerProducto);
router.delete('/:id', productoControl.eliminarProducto);

module.exports = router;