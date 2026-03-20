import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // En XAMPP usualmente va vacío
  database: 'grifos_center', // Este es el nombre real de tu DB
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;