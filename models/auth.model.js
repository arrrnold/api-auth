const mongoose = require('mongoose');

// esquema de usuario
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    token: String
});

// exportamos el modelo
module.exports = mongoose.model('User', UserSchema);
