'use strict'

var jwt = require('jwt-simple');
var momento = require('moment');
var claveSecretaInterna = 'clave_secreta_interna';

exports.createToken = function(usuario) {
    var payload = {
        sub: usuario._id, //id del registro de la base de datos de usuario
        name: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
        imagen: usuario.imagen,
        iat: momento().unix(), //fecha de creación del token
        exp: momento().add(30, 'days').unix //fecha de expiración
    };

    return jwt.encode(payload, claveSecretaInterna); //devolver el token codificado con payload, y clave secreta es codificar
    //los datos con una clave de acceso
};