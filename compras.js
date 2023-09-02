// 1. IMPORTACIONES
import mongoose from 'mongoose';

const compraSchema = new mongoose.Schema({
  idcompra: { type: Number, required: true },
  producto: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  fecha: { type: Date, required: true }
});

const Compra = mongoose.model('Compra', compraSchema);

export default Compra;
