import { Router } from 'express';
import validation from '../middlewares/validateSchedulingData';
import controller from '../controllers/schedulingController';
const router = Router();


router.post('/criar/:userId', validation.validarCriarAgendamento, controller.criarAgendamento);

router.get('/buscar/:id', validation.validarBuscarOuDeletarPorId, controller.buscarAgendamento);


router.put('/atualizar/:id', validation.validarAtualizarAgendamento, controller.atualizarAgendamento);


router.delete('/deletar/:id', validation.validarBuscarOuDeletarPorId, controller.deletarAgendamento);

export default router;