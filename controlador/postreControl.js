'use strict'

var posModelo = require('../modelo/postre');
var Evento = require('../modelo/evento');

var fs = require('fs');
var path = require('path');
const { param } = require('../rutas/usuarioRuta');
var postre = new posModelo();
var mongoosePagina = require('mongoose-pagination');

function insertMenuPo(req, res) {
    var datosPostre = req.body; // POST
    postre.nombre = datosPostre.nombre;
    postre.descripcion = datosPostre.descripcion;
    postre.imagen = datosPostre.imagen;

    postre
        .save()
        .then(postreBD => {
            res.status(200).send({
                postre: postreBD,
                mensaje: 'Menú Postre registrado'
            });
        })
        .catch(error => {
            res.status(500).send({ mensaje: 'Error en el almacenamiento del Menú postre' });
        });
}

function actualizarMenuPo(req, res) {
    var postreId = req.params.id;
    var datos = req.body;
    posModelo
        .findByIdAndUpdate(postreId, datos)
        .then(postreActualizado => {
            if (!postreActualizado) {
                res.status(404).send({ message: 'El menú postre no ha sido actualizado' });
            } else {
                res.status(200).send({ postre: postreActualizado });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al guardar el menú' });
        });
}

function borrarMenuPo(req, res) {
    var postreId = req.params.id;
    posModelo
        .findByIdAndRemove(postreId)
        .then(postreRemovido => {
            if (!postreRemovido) {
                res.status(404).send({ message: 'El menú de entrada no existe' });
            } else {
                res.status(200).send({
                    postre: postreRemovido,
                    mensaje: 'Menú principal removido'
                });
            }
        })
        .catch(error => {
            res.status(500).send({ mensaje: 'Error en el servidor' });
        });
}

module.exports = {
    insertMenuPo,
    actualizarMenuPo,
    borrarMenuPo
};