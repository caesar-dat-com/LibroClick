const express = require('express');
const morgan = require('morgan');
const usuariosController = require('./controllers/usuariosController');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(usuariosController);

app.listen(3001, () => {
  console.log('Microservicio Usuarios en puerto 3001');
});
