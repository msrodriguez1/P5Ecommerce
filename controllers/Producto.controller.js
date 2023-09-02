import Producto from '../producto.js';

export const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find({});
        res.json({ productos });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hubo un error obteniendo los datos",
            error: error.message
        });
    }
};