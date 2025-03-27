// prestamosMS/src/models/prestamosModel.js
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'prestamosDB'
});

// Crear prestamo
async function crearPrestamo(usuario_id, libro_id, fecha_devolucion) {
  const [result] = await connection.query(`
    INSERT INTO prestamos (usuario_id, libro_id, fecha_devolucion)
    VALUES (?, ?, ?)
  `, [usuario_id, libro_id, fecha_devolucion]);
  return result;
}

// Traer todos los prestamos
async function traerPrestamos() {
  const [rows] = await connection.query('SELECT * FROM prestamos');
  return rows;
}

// Traer prestamo por ID
async function traerPrestamoPorID(id) {
  const [rows] = await connection.query('SELECT * FROM prestamos WHERE id = ?', [id]);
  return rows;
}

// Actualizar prestamo (cambiar estado, fecha_devolucion, etc.)
async function actualizarPrestamo(id, estado, fecha_devolucion) {
  const [result] = await connection.query(`
    UPDATE prestamos
    SET estado = ?, fecha_devolucion = ?
    WHERE id = ?
  `, [estado, fecha_devolucion, id]);
  return result;
}

// Eliminar prestamo
async function eliminarPrestamo(id) {
  const [result] = await connection.query('DELETE FROM prestamos WHERE id = ?', [id]);
  return result;
}

module.exports = {
  crearPrestamo,
  traerPrestamos,
  traerPrestamoPorID,
  actualizarPrestamo,
  eliminarPrestamo
};
