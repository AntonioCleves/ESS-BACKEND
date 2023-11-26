// encargado de tener la logica y consultas a la base de datos 
const {Pool} = require('pg')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = new Pool({

    host: 'localhost',
    user: 'postgres',
    password: '12345',
    database: 'postgres',
    port: '5432'
})
let tokenGenerado = null;

const loginUser = async (req, res) => {
  const { nombre_usuario, password } = req.body;

  try {
    // Buscar el usuario en la base de datos por nombre de usuario
    const user = await pool.query('SELECT * FROM usuario WHERE nombre_usuario = $1', [usuario]);

    // Verificar si el usuario existe
    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Nombre de usuario  incorrecto' });
    }

    // Verificar la contraseña
    if (password !== user.rows[0].password) {
      return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
    }

    // Crear un token JWT para el usuario
    const token = jwt.sign({ userId: user.rows[0].cedula_usuario }, 'secretKey', { expiresIn: '1h' });
    tokenGenerado = token
    res.status(200).json({ token });
    console.log('Bienvenido a la tienda general!!')
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const obtenerTokenAlmacenado = () => {
  return tokenGenerado;
};

const getUsersCliente = async (req,res)=>{
  const response = await  pool.query('Select  * from cliente ')
  res.json(response.rows);
}

const crearUsersCliente = async (req,res)=>{
    const {cedula_cliente, direccion_cliente, email_cliente, nombre_cliente, telefono_cliente}  = req.body;
    const response = await  pool.query('INSERT INTO public.cliente(cedula_cliente, direccion_cliente, email_cliente, nombre_cliente, telefono_cliente) VALUES ($1,$2,$3,$4,$5)',[cedula_cliente, direccion_cliente, email_cliente, nombre_cliente, telefono_cliente] )
    res.send('Cliente creado');
  }

  const actualizarUserCliente = async (req,res)=>{
    const id = req.params.cedula_cliente;
    const {cedula_cliente, direccion_cliente, email_cliente, nombre_cliente, telefono_cliente} = req.body;
    const response = await  pool.query('UPDATE  CLIENTE  SET cedula_cliente = $1, direccion_cliente = $2 , email_cliente =$3 , nombre_cliente = $4, telefono_cliente = $5 WHERE cedula_cliente = $6',[cedula_cliente, direccion_cliente, email_cliente, nombre_cliente, telefono_cliente,id]);
    console.log(response);
    res.json(`Cliente ${id} actualizado de forma correcta`);
  }

  const eliminarUsersCliente = async (req,res)=>{
    const id = req.params.cedula_cliente;
    const response = await  pool.query('DELETE FROM  CLIENTE WHERE cedula_cliente = $1',[id]);
    console.log(response);
    res.json(`Usuario ${id} eliminado satisfactoriamente`);
  }

  ////////////////////////////////////////////////////
  const getUsuario = async (req,res)=>{
    const response = await  pool.query('Select  * from usuario   ')
    res.json(response.rows);
  }
  
  const crearUsuario = async (req,res)=>{
      const {cedula_usuario, email_usuario, nombre_usuario, password, usuario}  = req.body;
      const response = await  pool.query('INSERT INTO public.usuario(cedula_usuario, email_usuario, nombre_usuario, password, usuario) VALUES ($1,$2,$3,$4,$5)',[cedula_usuario, email_usuario, nombre_usuario, password, usuario] )
      res.send('Usuario creado');
    }
  
    const actualizarUsuario = async (req,res)=>{
      const id = req.params.cedula_usuario;
      const {cedula_usuario, email_usuario, nombre_usuario, password, usuario} = req.body;
      const response = await  pool.query('UPDATE  USUARIO  SET cedula_usuario = $1, email_usuario = $2 , nombre_usuario =$3 , password = $4, usuario = $5 WHERE cedula_usuario = $6',[cedula_usuario, email_usuario, nombre_usuario, password, usuario,id]);
      console.log(response);
      res.json(`Usuario ${id} actualizado de forma correcta`);
    }
  
    const eliminarUsuario = async (req,res)=>{
      const id = req.params.cedula_usuario;
      const response = await  pool.query('DELETE FROM  USUARIO WHERE cedula_usuario = $1',[id]);
      console.log(response);
      res.json(`Usuario ${id} eliminado satisfactoriamente`);
    }

      ////////////////////////////////////////////////////
  const getProveedor = async (req,res)=>{
    const response = await  pool.query('Select  * from proveedor   ')
    res.json(response.rows);
  }
  
  const crearProveedor = async (req,res)=>{
      const {nit_proveedor, ciudad_proveedor, direccion_proveedor, nombre_proveedor, telefono_proveedor}  = req.body;
      const response = await  pool.query('INSERT INTO public.proveedor(nit_proveedor, ciudad_proveedor, direccion_proveedor, nombre_proveedor, telefono_proveedor) VALUES ($1,$2,$3,$4,$5)',[nit_proveedor, ciudad_proveedor, direccion_proveedor, nombre_proveedor, telefono_proveedor] )
      res.send('Usuario creado');
    }
  
    const actualizarProveedor = async (req,res)=>{
      const id = req.params.nit_proveedor;
      const {nit_proveedor, ciudad_proveedor, direccion_proveedor, nombre_proveedor, telefono_proveedor} = req.body;
      const response = await  pool.query('UPDATE  proveedor  SET nit_proveedor = $1, ciudad_proveedor = $2 , direccion_proveedor =$3 , nombre_proveedor = $4, telefono_proveedor = $5 WHERE nit_proveedor = $6',[nit_proveedor, ciudad_proveedor, direccion_proveedor, nombre_proveedor, telefono_proveedor,id]);
      console.log(response);
      res.json(`Proveedor ${id} actualizado de forma correcta`);
    }
  
    const eliminarProveedor = async (req,res)=>{
      const id = req.params.nit_proveedor;
      const response = await  pool.query('DELETE FROM  proveedor WHERE nit_proveedor = $1',[id]);
      console.log(response);
      res.json(`Proveedor ${id} eliminado satisfactoriamente`);
    }
module.exports = {
loginUser,
getUsersCliente,
crearUsersCliente,
eliminarUsersCliente,
actualizarUserCliente,
getUsuario,
crearUsuario,
actualizarUsuario,
eliminarUsuario,
getProveedor,
crearProveedor,
actualizarProveedor,
eliminarProveedor
}