// 1. IMPORTACIONES
import express from 'express';
const app           = express() ;    
import cors from 'cors';
app.use(cors())

import Producto from './producto.js'
import connectDB from './db.js'
import { obtenerProductos } from './controllers/Producto.controller.js';

app.get("/obtener-productos", obtenerProductos);
// 2. MIDDLEWARES

//VARIABLES DE ENTORNO
import  {config}  from 'dotenv';
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



app.post("/crear-producto", async(req, res) => {  
    const { id,producto,marca,coleccion,categoria,color,talla,material,imagen,stock} = req.body

    try {
        const nuevoProducto = await Producto.create({ id,producto,marca,coleccion,categoria,color,talla,material,imagen,stock })

        res.json(nuevoProducto)

    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error creando el producto"
        })
        
    }  
})

app.put("/actualizar-producto", async(req, res) => {  
    const { id,producto,marca,coleccion,categoria,color,talla,material,imagen,stock} = req.body

    try {
        const actualizacionProducto = await Producto.findByIdAndUpdate(id, { producto,marca,coleccion,categoria,color,talla,material,imagen,stock }, { new: true })

        res.json(actualizacionProducto)

    } catch (error) {
        
        res.status(500).json({
            msg: "Hubo un error actualizando el producto"
        })

    }
})

app.delete("/borrar-producto", async(req, res) => {   
    const{id} =req.body
    try {

        const productoBorrada = await Producto.findByIdAndRemove({_id: id })

        res.json(productoBorrada)
        

    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error borrando el producto especificado"
        })
    }


})

// 4. SERVIDOR
app.listen(process.env.PORT, () => {
    console.log("El servidor está de pie")
})