'use strict'

const bcrypt = require('bcrypt');
const usuarios = require('../modelo/usuarios');
var usuariosModelo = require('../modelo/usuarios');
var usuario = new usuariosModelo(); //usuarios es un objeto que guarda en la bd 
var jwt = require('../servicio/jwt');
var fs = require('fs');
var path = require('path');

exports.registrarUsuario = (req, res) => {
    var usuario = new usuariosModelo();

    var params = req.body; //recibe todos los datos por Por el Metodo POST
    console.log(params);

    usuario.nombre = params.nombre;
    usuario.apellido = params.apellido;
    usuario.email = params.email;
    usuario.direccion = params.direccion;
    usuario.telefono = params.telefono;
    usuario.imagen = 'null';

    if (params.password) {
        bcrypt.hash(params.password, 10, function(err, hash) {
            usuario.password = hash;
            if (usuario.nombre != null && usuario.apellido != null && usuario.email != null && usuario.direccion != null && usuario.telefono != null) {
                //guardar el ususario en BD
                usuario.save()
                    .then(usuarioAlmacenado => {
                        if (!usuarioAlmacenado) {
                            res.status(404).send({ mesagge: 'No se ha registrado el ususario' });
                        } else {
                            //nos devuelve un objeto con los datos del ususario guardado
                            res.status(200).send({ usuariosModelo: usuarioAlmacenado });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({ mesagge: 'Error al guardar el usuario' });
                    });
            } else {
                res.status(200).send({ mesagge: 'Introduce todos los campos' });
            }
        });
    } else {
        res.status(500).send({ mesagge: 'Introduce la contraseña' });
    }
}

exports.accesoUsuario = (req, res) => {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    usuariosModelo.findOne({ email: email })
        .then(usuario => {
            if (!usuario) {
                res.status(404).send({ mesagge: 'El usuario no existe' });
            } else {
                bcrypt.compare(password, usuario.password)
                    .then(check => {
                        if (check) {
                            console.log('coincide el password');
                            if (params.gethash) {
                                res.status(200).send({
                                    token: jwt.createToken(usuario)
                                });
                            } else {
                                res.status(200).send({ usuario: usuario });
                            }
                        } else {
                            res.status(404).send({ mesagge: 'El usuario no se ha identificado' });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({ mesagge: 'Error en la comparación de contraseñas' });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({ mesagge: 'Error en la petición al servidor' });
        });
}

exports.actualizarUsuario = (req, res) => { //PUT
    var usuarioId = req.params.id; //GET
    var update = req.body //POST

    usuariosModelo.findByIdAndUpdate(usuarioId, update)
        .then(usuarioUpdate => {
            if (!usuarioUpdate) {
                res.status(404).send({ message: 'No se ha podido encontrar el usuario' });
            } else {
                res.status(200).send({ usuario: usuarioUpdate });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al actualizar el usuario en el servidor' });
        });
}

exports.eliminarRegistro = (req, res) => {
    const id = req.params.id;

    usuariosModelo.findByIdAndDelete(id) //Puede ser remove para versiones recientes y para versiones anteriores Delete 
        .then(() => {
            res.json({ message: 'Usuario eliminado exitosamente' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Error al eliminar el usuario', details: error });
        });

}