const Usuario = require('../usuario'); // Asegúrate de importar el modelo de Usuario
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {
    // OBTENER USUARIO, EMAIL Y PASSWORD DE LA PETICIÓN
    const { nombre, apellido, email, password } = req.body;

    try {
        // GENERAMOS FRAGMENTO ALEATORIO PARA USARSE CON EL PASSWORD
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // CREAMOS UN USUARIO CON SU PASSWORD ENCRIPTADO
        const respuestaDB = await Usuario.create({
            nombre,
            apellido,
            email,
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




exports.iniciarSesion = async (req, res) =>  {

    // OBTENEMOS EL EMAIL Y EL PASSWORD DE LA PETICIÓN
    const {email, password} = req.body

    try {
        // ENCONTRAMOS UN USUARIO
        let foundUser = await Usuario.findOne({email})

        // SI NO HUBO UN USUARIO ENCONTRADO, DEVOLVEMOS UN ERROR
        if(!foundUser){
            return res.status(400).json({msg: "El usuario no existe"})
        }

        // SI TODO OK, HACEMOS LA EVALUACIÓN DE LA CONTRASEÑA ENVIADA CONTRA LA BASE DE DATOS
        const passCorrecto = await bcryptjs.compare(password, foundUser.password)
        
        // SI EL PASSWORD ES INCORRECTO, REGRESAMOS UN MENSAJE SOBRE ESTO
        if(!passCorrecto){
            return await res.status(400).json({msg: "Password incorrecto"})
        }

        // SI TODO CORRECTO, GENERAMOS UN JSON WEB TOKEN
        // 1. DATOS DE ACOMPAÑAMIENTO AL JWT
        const payload = {
            user: {
                id: foundUser.id
            }
        }

        // 2. FIRMA DEL JWT
        jwt.sign(
            payload, 
            process.env.SECRET, 
            {
                expiresIn: 3600000
            }, 
            (error, token) => {
                if(error) throw error;
                
                //SI TODO SUCEDIÓ CORRECTAMENTE, RETORNAR EL TOKEN
                res.json({token})
        })
        
    } catch (error) {
        res.json({
            msg: "Hubo un error",
            error
        })
    }

}



exports.verificarUsuario = async (req, res) => {

    try {
        // CONFIRMAMOS QUE EL USUARIO EXISTA EN BASE DE DATOS Y RETORNAMOS SUS DATOS, EXCLUYENDO EL PASSWORD
        const usuario = await Usuario.findById(req.user.id).select('-password')
        res.json({usuario})

    } catch (error) {
        // EN CASO DE HERROR DEVOLVEMOS UN MENSAJE CON EL ERROR
        res.status(500).json({
            msg: "Hubo un error",
            error
        })
    }
}



