//Encargada de redireccionar en la pagina
const {Router} = require('express')
const router = Router();
const authMiddleware = require('../controllers/authMiddleware');
const {getUsersCliente,crearUsersCliente,eliminarUsersCliente,actualizarUserCliente,loginUser,getUsuario,crearUsuario,actualizarUsuario,eliminarUsuario,
    getProveedor,crearProveedor,eliminarProveedor,actualizarProveedor} = require('../controllers/index.controller')
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

module.exports = router;