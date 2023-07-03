'use strict'

var enModelo = require('../modelo/entradaUs');

exports.insertMenuEn = (req, res) => {
    var datosEntrada = req.body;
    var entrada = new enModelo({
        ingredientes: datosEntrada.ingredientes,
        acompanado: datosEntrada.acompanado
    });

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

exports.obtenerProductos = (req, res) => {
    enModelo.find()
        .then(entradas => {
            res.json(entradas);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Hubo un error');
        });
}

exports.obtenerProducto = (req, res) => {
    enModelo.findById(req.params.id)
        .then(entradaUs => {
            if (!entradaUs) {
                res.status(404).json({ msg: 'No existe el producto' });
            } else {
                res.json(entradaUs);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Hubo un error');
        });
}

exports.actualizarMenuEn = (req, res) => {
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

exports.borrarMenuEn = (req, res) => {
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