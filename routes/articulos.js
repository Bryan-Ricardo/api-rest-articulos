//Importaciones extras
const {Router} = require('express');

//Dependencias
const multer = require('multer');


//Mis importaciones
const { articulosGet, articulosPut, articulosPost, articulosDelete ,articulosImagenPost,articulosImagenGet} = require('../controllers/articulos');


const router = Router();
const storageStrategy = multer.memoryStorage();
const upload = multer({storage:storageStrategy})

router.get('/',articulosGet);

router.put('/:id',articulosPut);

router.post('/',articulosPost);

router.delete('/:id',articulosDelete);

router.post('/imagen',upload.single('imagen'),articulosImagenPost)

router.get('/imagen/:image',articulosImagenGet)


module.exports = router;