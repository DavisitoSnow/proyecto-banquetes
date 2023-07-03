'use strict';

const PostreUs = require('../modelo/postreUs');

exports.insertMenuPo = (req, res) => {
    var datosPostre = req.body; // POST
    var postre = new PostreUs({
        ingredientes: datosPostre.ingredientes,
        acompanado: datosPostre.acompanado
    });

    postre.save()
        .then(postreBD => {
            res.status(200).send({
                postreUs: postreBD,
                mensaje: 'Menú Postre registrado'
            });
        })
        .catch(error => {
            res.status(500).send({ mensaje: 'Error en el almacenamiento del Menú postre' });
        });
}

exports.obtenerMenuPos = (req, res) => {
    PostreUs.find()
        .then(postres => {
            res.json(postres);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Hubo un error');
        });
}

exports.obtenerMenuPo = (req, res) => {
    PostreUs.findById(req.params.id)
        .then(postreUs => {
            if (!postreUs) {
                res.status(404).json({ msg: 'No existe el producto' });
            } else {
                res.json(postreUs);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Hubo un error');
        });
}

exports.actualizarMenuPo = (req, res) => {
    var postreId = req.params.id;
    var datos = req.body;
    PostreUs
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

exports.borrarMenuPo = (req, res) => {
    var postreId = req.params.id;
    PostreUs
        .findByIdAndRemove(postreId)
        .then(postreRemovido => {
            if (!postreRemovido) {
                res.status(404).send({ message: 'El menú de entrada no existe' });
            } else {
                res.status(200).send({
                    postreUs: postreRemovido,
                    mensaje: 'Menú principal removido'
                });
            }
        })
        .catch(error => {
            res.status(500).send({ mensaje: 'Error en el servidor' });
        });
}