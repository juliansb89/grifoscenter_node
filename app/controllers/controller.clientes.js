import pool from '../config/db.js';

// Obtener todos los clientes
export const listarUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos' });
    }
};

// Obtener un usuario por ID
export const obtenerUsuario = async (req, res) => {
    // Por implementar
};

// Crear nuevo usuario
export const crearUsuario = async (req, res) => {
    // Por implementar
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
    // Por implementar
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
    // Por implementar
};