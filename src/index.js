
const express = require('express')
const app = express()
//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// express nos permite subir un API al servidor de forma sencilla
app.listen(3000,()=>{
    console.log('server conectado de forma correcta en el puerto 3000')
});

// definicion de rutas
app.use(require('./routes/index'))