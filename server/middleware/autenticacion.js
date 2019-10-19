const jwt = require('jsonwebtoken');

/*
Verificación de tokens
*/

let verificarToken = (req, res, next) => {

    let token = req.get('token'); //'token', variable utlizada en postman

    jwt.verify(token, process.env.SEED, (err, encoded) => { /*encoded=payload */

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no válido"
                }
            });
        }

        req.usuario = encoded.usuario;
        next();
    });
};

/*
Verificación de ADMIN_ROLE*/

let verificarAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        res.json({
            ok: false,
            err: {
                message: "El usuario no es administrador"
            }
        });
    }
};

module.exports = {
    verificarToken,
    verificarAdminRole
}