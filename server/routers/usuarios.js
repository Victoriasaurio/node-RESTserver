const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express();


app.get('/usuario', function(req, res) {
    res.json('get')
});

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //Encripta las contraseñas
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

/* Método que permite actualizar la información utilizando el ID del usuario
   los parámetros actuan de la sig. manera:
   id, 
   body: parámetros de la BD, 
   
   {new: true}: actualiza la información al comprobarlo en POSTMAN
   {runValidators: true} valida las operaciones creadas en el esquema: por ejemplo: 'rolesValidados'

   Función flecha del err y los usuarios de la BD */

app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']); /* Unicamente permite actualizar estos objetos por medio de pick */

    /* Evita actualizar los campos es útil cuando son pocos objetos
    delete body.password;
    delete body.google;
    */
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});

app.delete('/usuario', function(req, res) {
    res.json('delete')
});

module.exports = app;