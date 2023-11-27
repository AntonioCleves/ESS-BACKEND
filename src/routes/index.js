//Encargada de redireccionar en la pagina
const {Router} = require('express')
const router = Router();
const authMiddleware = require('../controllers/authMiddleware');
const multer = require('multer');

const storage = multer.memoryStorage(); // o utiliza el almacenamiento en disco si lo prefieres
const upload = multer({ storage: storage });
const {getUsersCliente,crearUsersCliente,eliminarUsersCliente,actualizarUserCliente,loginUser,getUsuario,crearUsuario,actualizarUsuario,eliminarUsuario,
    getProveedor,crearProveedor,eliminarProveedor,actualizarProveedor,cargarProductos,eliminarProducto,getProducto,
    actualizarProducto} = require('../controllers/index.controller')
router.post('/login',loginUser);

//router.use(authMiddleware); // Middleware de autenticación para las rutas siguientes
router.get('/usersCliente',getUsersCliente);
router.post('/crearUsersCliente',crearUsersCliente);
router.delete('/eliminarUsersCliete/:cedula_cliente',eliminarUsersCliente);
router.put('/actualizarUserCliente/:cedula_cliente',actualizarUserCliente);
router.get('/users',getUsuario);
router.post('/crearUsers',crearUsuario);
router.put('/actualizarUser/:cedula_usuario',actualizarUsuario);
router.delete('/eliminarUsers/:cedula_usuario',eliminarUsuario);

router.get('/proveedor',getProveedor);
router.post('/crearProveedor',crearProveedor);
router.delete('/eliminarProveedor/:nit_proveedor',eliminarProveedor);
router.put('/actualizarProveedor/:nit_proveedor',actualizarProveedor);

router.post('/cargarProductos', upload.single('archivoNombre'), cargarProductos);

router.get('/producto',getProducto);
router.delete('/eliminarProducto/:codigo_producto',eliminarProducto);
router.put('/actualizarProducto/:codigo_producto',actualizarProducto);
module.exports = router;    