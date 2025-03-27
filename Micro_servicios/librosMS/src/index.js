const express = require('express');
const morgan = require('morgan');
const librosController = require('./controllers/librosController');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(librosController);

app.listen(3002, () => {
  console.log('Microservicio Libros en puerto 3002');
});
