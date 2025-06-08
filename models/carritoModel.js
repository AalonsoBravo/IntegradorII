const mongoose = require("mongoose");

const carritoSchema = new mongoose.Schema({
    productos: [
        {
            productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
            cantidad: { type: Number, required: true }
        }
    ],
    fechaCreacion: { type: Date, default: Date.now }
});

const Carrito = mongoose.model("Carrito", carritoSchema);
module.exports = Carrito;
