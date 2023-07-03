'use strict'

var enModelo = require('../modelo/entrada');


var fs = require('fs');
var path = require('path');
const { param } = require('../rutas/usuarioRuta');
var entrada = new enModelo();
var mongoosePagina = require('mongoose-pagination');

function insertMenuEn(req, res) {
    var datosEntrada = req.body; // POST
    entrada.nombre = datosEntrada.nombre;
    entrada.ingredientes = datosEntrada.ingredientes
    entrada.acompañado = datosEntrada.acompañado;

    entrada
        .save()
        .then(entradaBD => {
            res.status(200).send({
                entrada: entradaBD,
                mensaje: 'Menú Entrada registrado'
            });
        })
        .catch(error => {
            res.status(500).send({ mensaje: 'Error en el almacenamiento del Menú de entrada' });
        });
}

function actualizarMenuEn(req, res) {
    var entradaId = req.params.id;
    var datos = req.body;
    enModelo
        .findByIdAndUpdate(entradaId, datos)
        .then(entradaActualizado => {
            if (!entradaActualizado) {
                res.status(404).send({ message: 'El menú de entrada no ha sido actualizado' });
            } else {
                res.status(200).send({ entrada: entradaActualizado });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al guardar el menú' });
        });
}

function borrarMenuEn(req, res) {
    var entradaId = req.params.id;
    enModelo
        .findByIdAndRemove(entradaId)
        .then(entradaRemovido => {
            if (!entradaRemovido) {
                res.status(404).send({ message: 'El menú de entrada no existe' });
            } else {
                res.status(200).send({
                    entrada: entradaRemovido,
                    mensaje: 'Menú de entrada removido'
                });
            }
        })
        .catch(error => {
            res.status(500).send({ mensaje: 'Error en el servidor' });
        });
}

module.exports = {
    insertMenuEn,
    actualizarMenuEn,
    borrarMenuEn
};