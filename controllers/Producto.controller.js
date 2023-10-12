const Producto = require('../producto.js');

exports.obtenerProductos = async (req, res) => {
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



  
  exports.crearProducto = async (req, res) => {  
    const { id,producto,marca,coleccion,categoria,color,talla,material,imagen,stock} = req.body

    try {
        const nuevoProducto = await Producto.create({ id,producto,marca,coleccion,categoria,color,talla,material,imagen,stock })

        res.json(nuevoProducto)

    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error creando el producto"
        })
        
    }  
}

exports.actualizarProducto= async (req, res) => {  
    const { id,producto,marca,coleccion,categoria,color,talla,material,imagen,stock} = req.body

    try {
        const actualizacionProducto = await Producto.findByIdAndUpdate(id, { producto,marca,coleccion,categoria,color,talla,material,imagen,stock }, { new: true })

        res.json(actualizacionProducto)

    } catch (error) {
        
        res.status(500).json({
            msg: "Hubo un error actualizando el producto"
        })

    }
}

exports.borrarProducto = async (req, res) => {   
    const{id} =req.body
    try {

        const productoBorrada = await Producto.findByIdAndRemove({_id: id })

        res.json(productoBorrada)
        

    } catch (error) {
        res.status(500).json({
            msg: "Hubo un error borrando el producto especificado"
        })
    }


}


exports.encontrarProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (producto) {
            res.json(producto);
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener el producto" });
    }
};
