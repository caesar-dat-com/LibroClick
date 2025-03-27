const express = require('express');
const morgan = require('morgan');
const prestamosController = require('./controllers/prestamosController');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(prestamosController);
app.listen(3003, () => {
  console.log('Microservicio Prestamos en puerto 3003');
});
