// controlador de acceso

const User = require('../models/auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

// registro de usuario
exports.register = async (req, res) => {
    // encriptamos la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan parámetros"
        })
    } else {
        try {
            const usuarioExistente = await User.findOne({email: email})

            if (usuarioExistente) {
                res.status(400).json({
                    estado: 0,
                    mensaje: "El usuario ya existe"
                })
            } else {
                // creamos un nuevo usuario
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                });

                // guardamos el usuario
                const usuarioGuardado = await user.save();
                res.status(200).json({
                    estado: 1,
                    mensaje: "Usuario registrado correctamente",
                    datos: usuarioGuardado
                })
            }

        } catch (error) {
            res.status(500).json({
                estado: 0,
                mensaje: "Ha ocurrido un error desconocido"

            })
        }
    }
}

// login de usuario
exports.login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        res.status(400).json({
            estado: 0,
            mensaje: "Faltan parámetros"
        })
    } else {

        // validamos que el usuario exista
        const usuario = User({email: email});
        const usuarioExistente = await User.findOne({email: email})

        try {
            if (!usuarioExistente) {
                res.status(404).json({
                    estado: 0,
                    mensaje: "Usuario no encontrado"
                })
            } else {

                // validamos que la contraseña sea correcta
                const passwordValido = await bcrypt.compare(password, usuarioExistente.password);

                if (!passwordValido) {
                    res.status(400).json({
                        estado: 0,
                        mensaje: "Contraseña incorrecta"
                    })
                } else {

                    // creamos un token de acceso
                    const token = jwt.sign({_id: usuarioExistente._id}, password, {algorithm: 'HS256'});
                    res.status(200).json({
                        estado: 1,
                        mensaje: "Usuario autenticado correctamente",
                        email: email,
                        name: usuarioExistente.name,
                        token: token
                    })
                }
            }
        } catch (error) {
            res.status(500).json({
                estado: 0,
                mensaje: "Ha ocurrido un error desconocido"
            })
        }
    }
}