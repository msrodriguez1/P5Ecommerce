const mongoose =require(  'mongoose')

const UsuarioSchema = mongoose.Schema({

    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    email: {
        type: String
    },
    direccion: {
        type: String
    },
    password:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const Usuario = mongoose.model("Usuario", UsuarioSchema)

module.exports = Usuario;
