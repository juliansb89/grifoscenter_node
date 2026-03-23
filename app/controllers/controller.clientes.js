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

export const obtenerUsuario = async (req, res) => {
    try {
        // 1. Capturamos el id que viene en la URL
        const { id } = req.params;

        // 2. Hacemos la consulta a TU tabla 'clientes' usando TU columna 'Id_cliente'
        const [rows] = await pool.query(
            'SELECT * FROM clientes WHERE Id_cliente = ?',
            [id]
        );

        // 3. Si no hay resultados, avisamos que el cliente no existe
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        // 4. Si lo encuentra, enviamos solo los datos de ese cliente
        res.json(rows[0]);

    } catch (error) {
        // En caso de error de conexión o base de datos
        res.status(500).json({ error: error.message });
    }
};

export const crearUsuario = async (req, res) => {
    // 1. Extraemos los datos que enviaremos desde el cuerpo (body) de la petición
    const { Nombres, correo, Direccion, celular } = req.body;
    
    try {
        // 2. Ejecutamos el INSERT con tus 4 campos
        const [result] = await pool.query(
            'INSERT INTO clientes (Nombres, correo, Direccion, celular) VALUES (?, ?, ?, ?)',
            [Nombres, correo, Direccion, celular]
        );

        // 3. Respondemos con un código 201 (Creado) y los datos que acabamos de insertar
        res.status(201).json({
            id: result.insertId,
            Nombres,
            correo,
            Direccion,
            celular
        });

    } catch (error) {
        // Si hay un error (por ejemplo, falta un dato), avisamos
        res.status(500).json({ error: error.message });
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params; // Sacamos el ID de la URL
        const { Nombres, correo, Direccion, celular } = req.body; // Sacamos los nuevos datos del body

        await pool.query(
            'UPDATE clientes SET Nombres = ?, correo = ?, Direccion = ?, celular = ? WHERE Id_cliente = ?',
            [Nombres, correo, Direccion, celular, id]
        );

        res.json({ message: 'Cliente actualizado correctamente' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Función para eliminar un cliente
export const eliminarUsuario = async (req, res) => {
    try {
        // 1. Obtenemos el ID de la URL
        const { id } = req.params;

        // 2. Ejecutamos la eliminación en la base de datos
        // Usamos Id_cliente porque así lo tienes en tu tabla
        const [result] = await pool.query(
            'DELETE FROM clientes WHERE Id_cliente = ?', 
            [id]
        );

        // 3. ¡ESTO ES LO QUE FALTABA! 
        // Enviamos una respuesta al cliente (Thunder Client) para que no se quede cargando
        if (result.affectedRows > 0) {
            res.json({ message: `Cliente con ID ${id} eliminado con éxito` });
        } else {
            res.status(404).json({ message: "No se encontró el cliente para eliminar" });
        }

    } catch (error) {
        // Si algo falla, avisamos qué pasó
        res.status(500).json({ error: "Error en el servidor: " + error.message });
    }
};