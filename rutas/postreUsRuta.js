// Rutas para producto
const express = require('express');
const router = express.Router();
const postreUsControl = require('../controlador/postreUsControl');

// api/productos
router.post('/', postreUsControl.insertMenuPo);
router.put('/:id', postreUsControl.actualizarMenuPo);
router.delete('/:id', postreUsControl.borrarMenuPo);
router.get('/', postreUsControl.obtenerMenuPos);
router.get('/:id', postreUsControl.obtenerMenuPo);

module.exports = router;