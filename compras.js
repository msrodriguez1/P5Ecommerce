// 1. IMPORTACIONES
import mongoose from 'mongoose';

// 2. SCHEMA
const productSchema = mongoose.Schema({
    id: Number,
    nombre: String,
    descripcion: String,
    precio: Number,
    moneda: String,
    cantidadEnStock: Number,
    categoria: String,
    imagen: String,
    cantidad: Number
    },
    {
        timestamps: true
    }
)

// 3. MODELO
const Producto = mongoose.model('productos', productSchema)

// 4. EXPORTACIÓN
export default Producto;
