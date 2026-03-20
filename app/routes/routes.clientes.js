import { Router } from 'express';
import {
    listarUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} from '../controllers/controller.clientes.js';

const router = Router();

router.get('/clientes', listarUsuarios);
router.get('/clientes/:id', obtenerUsuario);
router.post('/clientes', crearUsuario);
router.put('/clientes/:id', actualizarUsuario);
router.delete('/clientes/:id', eliminarUsuario);

export default router;