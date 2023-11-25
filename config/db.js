const mongoose = require('mongoose');

// conexion a la bd
// const urlLocal = 'mongodb://localhost:27017/mean-crud';
// crear conexion a la db
const urlRemota = 'mongodb+srv://admin:tm02arnold@clusteatm.dkbwrof.mongodb.net/'
mongoose
    .connect(urlRemota) // conexion a la db
    .then(() => console.log('Conexion establecida a la db')) // mensaje de conexion exitosa
    .catch((error) => console.log(error)) // mensaje del error si es que ocurre

module.exports = mongoose;