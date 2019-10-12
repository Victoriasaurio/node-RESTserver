const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Define los roles que son permitidos que se inserten en la BD
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} Rol no válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'The name is necessary']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email is necessary']
    },
    password: {
        type: String,
        required: [true, 'The password is necessary']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

/* Creación de un función donde se asigna una variable para almacenar la contraseña
    y que las personas terceras no puedan verlo */
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} Debe ser único' });

//Exportando el modelo
module.exports = mongoose.model('Usuario', usuarioSchema);