const { Router } = require('express');
const router = Router();
const usuariosModel = require('../models/usuariosModel');

// Crear usuario
router.post('/usuarios/create', async (req, res) => {
  const { nombre, correo, codigo } = req.body;
  try {
    await usuariosModel.crearUsuario(nombre, correo, codigo);
    res.status(201).send('Usuario creado exitosamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear usuario');
  }
});

// Traer todos los usuarios
router.get('/usuarios/get/all', async (req, res) => {
  try {
    const usuarios = await usuariosModel.traerUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al traer usuarios');
  }
});

// Traer un usuario por ID
router.get('/usuarios/get/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await usuariosModel.traerUsuarioPorID(id);
    if (result.length === 0) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al traer el usuario');
  }
});

// Actualizar usuario
router.put('/usuarios/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, codigo } = req.body;
  try {
    await usuariosModel.actualizarUsuario(id, nombre, correo, codigo);
    res.send('Usuario actualizado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar usuario');
  }
});

// Eliminar usuario
router.delete('/usuarios/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await usuariosModel.eliminarUsuario(id);
    res.send('Usuario eliminado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar usuario');
  }
});

module.exports = router;
