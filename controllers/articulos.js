//Importaciones de Node
const fs = require('fs');
const {Request,Response} = require('express');
const path = require('path');
//Dependencias
const {v4:uuidv4} = require('uuid'); //Crear id
const sharp = require('sharp');

//Mis importaciones
const Articulo = require('../models/articulo');
const Image = require('../models/image');


const articulosGet = async(req,res)=>{
    //console.log(uuidv4());
    const articulos = await Articulo.find();
    res.json({
        articulos
    })
}

const articulosPut = async(req,res)=>{
    const {id} = req.params;
    const {...resto} = req.body;

    //Actualizar Articulo
    const articulo = await Articulo.findByIdAndUpdate(id,resto);

    res.json({
        articulo
    })
}

const articulosPost = async(req,res)=>{
    const {nombre,img,precio,cantidad,descripcion,estado} = req.body;
    const articulo = new Articulo({nombre,img,precio,cantidad,descripcion,estado});
    
    //Creando el id
    //articulo.id = uuidv4();

    //Guardar en BD
    await articulo.save();
    
    res.json({
        articulo
    })
}

const articulosDelete = async(req,res)=>{
    const {id} = req.params;
    const {...resto} = req.body;
    resto.estado = false;
    //Eliminar Articulo en la app 
    const articulo = await Articulo.findByIdAndUpdate(id,resto);
    res.json({
        articulo
    })
}


const articulosImagenGet = async(req,res)=>{
    const {image} =req.params;
    const pathImage = path.resolve(__dirname, `../uploads/${image}`)
    if(await fs.existsSync(pathImage)){
        res.sendFile(pathImage);
    }else{
        const pathNoImage = path.resolve(__dirname , '../uploads/error.png');
        res.sendFile(pathNoImage);
    }    
}

const articulosImagenPost = async(req,res)=>{
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path= 'public/uploads' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;
    /*res.json({
        image
    })*/
    const imagen = req.file;
    const processedImage = sharp(imagen.buffer);
    const resizedImage = processedImage.resize(400,400,{
        fit:'contain',
        background: '#FFF'
    });
    const reasizedImageBuffer = await resizedImage.toBuffer();
    
    fs.writeFileSync(`uploads/${image.originalname}`,reasizedImageBuffer);
    
    console.log(imagen);
}

module.exports = {
    articulosGet,
    articulosPut,
    articulosPost,
    articulosDelete,
    articulosImagenPost,
    articulosImagenGet
}