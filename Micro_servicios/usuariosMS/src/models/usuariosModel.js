const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'usuariosDB'
});

// Crear usuario
async function crearUsuario(nombre, correo, codigo) {
  const [result] = await connection.query(
    'INSERT INTO usuarios (nombre, correo, codigo) VALUES (?,?,?)',
    [nombre, correo, codigo]
  );
  return result;
}

// Traer todos los usuarios
async function traerUsuarios() {
  const [rows] = await connection.query('SELECT * FROM usuarios');
  return rows;
}

// Traer un usuario por ID
async function traerUsuarioPorID(id) {
  const [rows] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows;
}

// Actualizar usuario
async function actualizarUsuario(id, nombre, correo, codigo) {
  const [result] = await connection.query(
    'UPDATE usuarios SET nombre = ?, correo = ?, codigo = ? WHERE id = ?',
    [nombre, correo, codigo, id]
  );
  return result;
}

// Eliminar usuario
async function eliminarUsuario(id) {
  const [result] = await connection.query('DELETE FROM usuarios WHERE id = ?', [id]);
  return result;
}

module.exports = {
  crearUsuario,
  traerUsuarios,
  traerUsuarioPorID,
  actualizarUsuario,
  eliminarUsuario
};
