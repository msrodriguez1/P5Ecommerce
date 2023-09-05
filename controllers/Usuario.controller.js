const Usuario = require('../usuario.js'); // Asegúrate de importar el modelo de Usuario
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
    // OBTENER USUARIO, EMAIL Y PASSWORD DE LA PETICIÓN
    const { nombre, apellido, email,direccion, password } = req.body;

    try {
        // GENERAMOS FRAGMENTO ALEATORIO PARA USARSE CON EL PASSWORD
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // CREAMOS UN USUARIO CON SU PASSWORD ENCRIPTADO
        const respuestaDB = await Usuario.create({
            nombre,
            apellido,
            email,
            direccion,
            password: hashedPassword,
        });

        // USUARIO CREADO. VAMOS A CREAR EL JSON WEB TOKEN

        // 1. EL "PAYLOAD" SERÁ UN OBJETO QUE CONTENDRÁ EL ID DEL USUARIO ENCONTRADO EN BASE DE DATOS.
        // POR NINGÚN MOTIVO AGREGUES INFORMACIÓN CONFIDENCIAL DEL USUARIO (SU PASSWORD) EN EL PAYLOAD.
        const payload = {
            user: {
                id: respuestaDB._id,
            },
        };

        // 2. FIRMAR EL JWT
        jwt.sign(
            payload, // DATOS QUE SE ACOMPAÑARÁN EN EL TOKEN
            process.env.SECRET, // LLAVE PARA DESCIFRAR LA FIRMA ELECTRÓNICA DEL TOKEN,
            {
                expiresIn: 360000, // EXPIRACIÓN DEL TOKEN
            },
            (error, token) => {
                if (error) {
                    return res.status(500).json({
                        msg: 'Error al generar el token',
                        error,
                    });
                }

                res.json({
                    token,
                });
            }
        );
    } catch (error) {
        return res.status(400).json({
            msg: 'Hubo un error al crear el usuario',
            error,
        });
    }
};




exports.iniciarSesion = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Intento de inicio de sesión para el email:', email);

        let foundUser = await Usuario.findOne({ email });

        if (!foundUser) {
            console.log('Usuario no encontrado.');
            return res.status(400).json({ msg: "El usuario no existe" });
        }

        const passCorrecto = await bcryptjs.compare(password, foundUser.password);

        if (!passCorrecto) {
            console.log('Contraseña incorrecta.');
            return await res.status(400).json({ msg: "Password incorrecto" });
        }

        const payload = {
            user: {
                id: foundUser._id
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 3600000
            },
            (error, token) => {
                if (error) {
                    console.log('Error al generar el token:', error);
                    throw error;
                }

                console.log('Inicio de sesión exitoso para el usuario:', foundUser.email);
                res.json({
                    token,
                    user: {
                        _id: foundUser._id,
                        nombre: foundUser.nombre,
                        apellido: foundUser.apellido,
                        email: foundUser.email,
                        direccion: foundUser.direccion

                        // ... cualquier otra propiedad del usuario que desees enviar
                    }
                });
            }
        );

    } catch (error) {
        console.log('Error al procesar la solicitud de inicio de sesión:', error);
        res.json({
            msg: "Hubo un error",
            error
        });
    }
}




exports.verificarUsuario = async (req, res) => {

    try {
        // CONFIRMAMOS QUE EL USUARIO EXISTA EN BASE DE DATOS Y RETORNAMOS SUS DATOS, EXCLUYENDO EL PASSWORD
        const usuario = await Usuario.findById(req.user._id).select('-password')
        res.json({usuario})

    } catch (error) {
        // EN CASO DE HERROR DEVOLVEMOS UN MENSAJE CON EL ERROR
        res.status(500).json({
            msg: "Hubo un error",
            error
        })
    }
}



