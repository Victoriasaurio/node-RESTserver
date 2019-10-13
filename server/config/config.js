/*
PUERTO
*/
process.env.PORT = process.env.PORT || 3000;

/*
ENTORNO
*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*
Base de datos
*/
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://Victoriasaurio:U3mFQ0ddiNoShOAR@cluster0-2yvd4.mongodb.net/cafe';
}
process.env.URLDB = urlDB;