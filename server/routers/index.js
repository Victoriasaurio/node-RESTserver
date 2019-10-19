/* Configuración de rutas */

const express = require('express');
const app = express();

app.use(require('./login'));
app.use(require('./usuarios'));

module.exports = app;