import { Router } from 'express';
import { buscarUnidadesProximas } from '../controllers/unidadesController';
const router = Router();

router.get('/unidades-proximas', buscarUnidadesProximas);

export default router;
