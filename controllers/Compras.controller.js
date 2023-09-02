import Compra from '../compras.js';

export const obtenerCompras = async (req, res) => {
    try {
        const compras = await Compra.find({});
        res.json({ compras });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Hubo un error obteniendo los datos",
            error: error.message
        });
    }
};