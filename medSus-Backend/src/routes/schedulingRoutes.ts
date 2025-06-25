import { Router } from 'express';
import controller from '../controllers/schedulingController';
import validation from '../middlewares/validateSchedulingData';

const router = Router();

//minhas rotas
router.post('/cadastro/:id', validation.validarUserId, validation.validarCadastroAgendamento, controller.criarAgendamento);
router.get('/buscar/:id', validation.validarId, controller.buscarAgendamento);
router.put('/atualizar/:id', validation.validarId, validation.validarCamposAtualizacao, controller.atualizarAgendamento);
router.delete('/deletar/:id', validation.validarId, controller.deletarAgendamento);

export default router;