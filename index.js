import express from 'express';
import routeClientes from './app/routes/routes.clientes.js';

const app = express();
const PORT = 3000;



// Middleware para parsear JSON
app.use(express.json());
app.use('/api', routeClientes);



// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});