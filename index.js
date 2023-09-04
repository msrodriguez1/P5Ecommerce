// 1. IMPORTACIONES
const express =require('express') ;
const app           = express() ;    
const cors =require('cors');
const  bcryptjs  =require( 'bcryptjs');
const  jwt  =require( 'jsonwebtoken');
app.use(cors())

const Producto =require( './producto.js');
const Usuario =require('./usuario.js');
const Compra =require( './compras.js');

const connectDB =require( './db.js');
const{ obtenerProductos } =require( './controllers/Producto.controller.js');
const { obtenerCompras } =require(  './controllers/Compras.controller.js');
const {crearUsuario, iniciarSesion, verificarUsuario}=require('./controllers/Usuario.controller.js')

// index.js u otro archivo

const auth= require('./authorization.js');
// ...


// 2. MIDDLEWARES

//VARIABLES DE ENTORNO
const  {config}  =require('dotenv');
config();

try {
    connectDB();
} catch (error) {
    app.use((req, res, next) => {
        res.status(500).send({ error: error.message });
    });
}


//BODY-PARSER
app.use(express.json());

// 3. RUTEO
app.get("/obtener-productos", obtenerProductos);
// app.post("/crear-productos", crearProducto);
// app.put("/actualizar-productos", actualizarProducto);
// app.delete("/borrar-productos", borrarProducto);
app.post("/usuario/crear", crearUsuario);
app.post("/usuario/iniciar-sesion", iniciarSesion);
app.post("/usuario/verificar-usuario", auth, verificarUsuario);

app.get("/obtener-compras", obtenerCompras);

// 4. SERVIDOR
app.listen(process.env.PORT, () => {
    console.log("El servidor está de pie")
})