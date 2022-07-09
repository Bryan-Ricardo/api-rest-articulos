const {Schema,model} = require('mongoose');

const ArticuloSchema = Schema({
   /* id:{
        type: String,
        //required:[true,'El id es obligatorio']
    },*/
    nombre:{
        type:String,
        required:[true,'El correo es obligatorio'],
        unique:true
    },
    img:{
        type: String,
        default: "Sin imagen"
    },
    precio:{
        type: Number,
        required:[true,'El precio es obligatorio'],
    },
    cantidad:{
        type: Number,
        required:[true,'La cantidad es obligatoria'],
    },
    descripcion:{
        type: String,
        default: "Sin descripcion"
    },
    estado:{
        type:Boolean,
        default: true
    }
})

module.exports = model('Articulo',ArticuloSchema);