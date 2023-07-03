const mongoose = require('mongoose');
require('dotenv').config({ path: 'variable.env' });

const conectarDB = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.DB_MONGO, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log('BD Conectada');
                resolve();
            })
            .catch(error => {
                console.log('Error al conectar a la BD:', error);
                reject(error);
            });
    });
};

module.exports = conectarDB;