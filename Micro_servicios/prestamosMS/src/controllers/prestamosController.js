// prestamosMS/src/controllers/prestamosController.js
const { Router } = require('express');
const router = Router();
const prestamosModel = require('../models/prestamosModel');
const axios = require('axios');

// Crear prestamo
router.post('/prestamos/create', async (req, res) => {
  const { usuario_id, libro_id } = req.body;
  try {
    // 1. Verificar si el usuario existe
    const userResponse = await axios.get(`http://localhost:3001/usuarios/get/${usuario_id}`);
    if (!userResponse.data) {
      return res.status(404).send('Usuario no encontrado');
    }

    // 2. Verificar si el libro existe
    const libroResponse = await axios.get(`http://localhost:3002/libros/get/${libro_id}`);
    if (!libroResponse.data) {
      return res.status(404).send('Libro no encontrado');
    }

    const libro = libroResponse.data;
    if (libro.estado !== 'disponible') {
      return res.status(400).send('El libro no está disponible');
    }

    // 3. Calcular la fecha de devolución = fecha actual + 2 días
    const fechaDevolucion = new Date();
    fechaDevolucion.setDate(fechaDevolucion.getDate() + 2);

    // Convertimos la fecha a un formato compatible con MySQL DATETIME (opcional)
    // MySQL2 suele aceptar directamente un objeto Date de JS, pero para evitar problemas
    // es común transformarlo a "YYYY-MM-DD HH:MM:SS"
    const fechaDevolucionStr = fechaDevolucion
      .toISOString()          // "2025-03-30T14:25:00.000Z"
      .slice(0, 19)           // "2025-03-30T14:25:00"
      .replace('T', ' ');     // "2025-03-30 14:25:00"

    // 4. Crear el registro de préstamo en nuestra BD de prestamos con fecha_devolucion
    await prestamosModel.crearPrestamo(usuario_id, libro_id, fechaDevolucionStr);

    // 5. Cambiar estado del libro a 'activo'
    await axios.put(`http://localhost:3002/libros/edit/${libro_id}`, {
      titulo: libro.titulo,
      autor: libro.autor,
      isbn: libro.isbn,
      categoria: libro.categoria,
      estado: 'activo'
    });

    res.status(201).send('Préstamo creado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error al crear préstamo: ${error.message}`);
  }
});

// Traer todos los prestamos
router.get('/prestamos/get/all', async (req, res) => {
  try {
    const prestamos = await prestamosModel.traerPrestamos();
    res.json(prestamos);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al traer prestamos');
  }
});

// Traer prestamo por ID
router.get('/prestamos/get/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prestamosModel.traerPrestamoPorID(id);
    if (result.length === 0) {
      return res.status(404).send('Préstamo no encontrado');
    }
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al traer prestamo');
  }
});

// Actualizar prestamo (ej. devolver libro o cambiar estado)
router.put('/prestamos/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { estado, fecha_devolucion } = req.body;
  try {
    // 1. Actualizar en la BD de prestamos (ej. estado = 'devuelto')
    await prestamosModel.actualizarPrestamo(id, estado, fecha_devolucion);

    // 2. Si el estado pasa a 'disponible', entonces liberar el libro
    if (estado === 'disponible') {
      // - Buscar el préstamo, obtener libro_id
      const prestamoData = await prestamosModel.traerPrestamoPorID(id);
      if (prestamoData.length > 0) {
        const { libro_id } = prestamoData[0];

        // - Obtener datos del libro
        const libroResponse = await axios.get(`http://localhost:3002/libros/get/${libro_id}`);
        if (libroResponse.data) {
          const libro = libroResponse.data;
          // - Cambiar el estado del libro a 'disponible'
          await axios.put(`http://localhost:3002/libros/${libro_id}`, {
            titulo: libro.titulo,
            autor: libro.autor,
            isbn: libro.isbn,
            categoria: libro.categoria,
            estado: 'disponible'
          });
        }
      }
    }

    res.send('Préstamo actualizado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar préstamo');
  }
});

// Eliminar prestamo
router.delete('/prestamos/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prestamosModel.eliminarPrestamo(id);
    res.send('Préstamo eliminado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar préstamo');
  }
});

module.exports = router;
