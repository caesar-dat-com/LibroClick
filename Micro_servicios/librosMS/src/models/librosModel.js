// librosMS/src/models/librosModel.js
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'librosDB'
});

// Crear libro
async function crearLibro(titulo, autor, isbn, categoria) {
  const [result] = await connection.query(`
    INSERT INTO libros (titulo, autor, isbn, categoria)
    VALUES (?, ?, ?, ?)
  `, [titulo, autor, isbn, categoria]);
  return result;
}

// Traer todos los libros
async function traerLibros() {
  const [rows] = await connection.query('SELECT * FROM libros');
  return rows;
}

// Traer libro por ID
async function traerLibroPorID(id) {
  const [rows] = await connection.query('SELECT * FROM libros WHERE id = ?', [id]);
  return rows;
}

// Actualizar libro (incluye estado)
async function actualizarLibro(id, titulo, autor, isbn, categoria, estado) {
  const [result] = await connection.query(`
    UPDATE libros
    SET
      titulo = ?,
      autor = ?,
      isbn = ?,
      categoria = ?,
      estado = ?
    WHERE id = ?
  `, [titulo, autor, isbn, categoria, estado, id]);
  return result;
}

// Eliminar libro
async function eliminarLibro(id) {
  const [result] = await connection.query('DELETE FROM libros WHERE id = ?', [id]);
  return result;
}

module.exports = {
  crearLibro,
  traerLibros,
  traerLibroPorID,
  actualizarLibro,
  eliminarLibro
};
