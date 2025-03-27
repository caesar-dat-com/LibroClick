// librosMS/src/controllers/librosController.js
const { Router } = require('express');
const router = Router();
const librosModel = require('../models/librosModel');

// Crear libro
router.post('/libros/create', async (req, res) => {
  const { titulo, autor, isbn, categoria, cantidad } = req.body;
  try {
    await librosModel.crearLibro(titulo, autor, isbn, categoria);
    res.status(201).send('Libro creado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear libro');
  }
});

// Traer todos los libros
router.get('/libros/get/all', async (req, res) => {
  try {
    const libros = await librosModel.traerLibros();
    res.json(libros);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al traer los libros');
  }
});

// Traer un libro por ID
router.get('/libros/get/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await librosModel.traerLibroPorID(id);
    if (result.length === 0) {
      return res.status(404).send('Libro no encontrado');
    }
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al traer el libro');
  }
});


// Actualizar libro (ahora también se puede actualizar "estado")
router.put('/libros/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, isbn, categoria, estado } = req.body;
  try {
    await librosModel.actualizarLibro(id, titulo, autor, isbn, categoria, estado);
    res.send('Libro actualizado correctamente');
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el libro');
  }
});

// Eliminar libro
router.delete('/libros/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await librosModel.eliminarLibro(id);
    res.send('Libro eliminado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar libro');
  }
});

module.exports = router;

