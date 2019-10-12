const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express();


app.get('/usuario', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde); /* allowed send parameters; convert DESDE number */

    let limite = req.query.limite || 5;
    limite = Number(limite);

    /* Example: ?limite10&desde=10 */

    /* Se pueden seleccionar campos a imprimir: 'nombre email'*/
    Usuario.find({}, 'nombre email') /* La condición debe ser igual en caso de que hubiera en el 'count' */
        .skip(desde)
        .limit(limite) /* allowed users on screen */
        .exec((err, usuario) => { /* execute find err or show objects array*/
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            /* Cuenta el total de datos */
            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    usuario,
                    cuantos: conteo
                });
            });
        });
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

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    });
});

module.exports = app;