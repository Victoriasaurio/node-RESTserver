/*
PUERTO
*/
process.env.PORT = process.env.PORT || 3000;

/*
ENTORNO
*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*
Fecha de expiración
- 60 segundos
- 60 minutos
- 24 horas
- 30 dias
*/
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

/*
SEED de autenticación
*/
process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo';


/*
Base de datos
*/
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO; /*Se utilizó una variable de entorno para MONGO*/
}
process.env.URLDB = urlDB;

/*
GOOGLE Client ID
*/
process.env.CLIENT_ID = process.env.CLIENT_ID || '498216475166-ok0t4ptcg5ireinlqqaakfb0ncdspcj7.apps.googleusercontent.com';