const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const authRoute = require('./routes/auth.route');
const db = require('./config/db');

// para usar antes de las rutas de acceso
app.use(express.json());
app.use("/socios/v1/auth", authRoute);

// ruta de bienvenida
app.get('/socios/v1/auth/', (req, res) => {
    res.send('bienvenid@');
});

// ejecutar servidor
app.listen(port, () => console.log('Servidor corriendo en el puerto ', port)); // ejecutar el servidor