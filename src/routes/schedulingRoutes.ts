import { Router } from 'express';
import controller from '../controllers/schedulingController';
import validation from '../middlewares/validateSchedulingData';

const agendamento = Router();

// ===== ROTAS DE AGENDAMENTO =====

// Criar novo agendamento para um usuário específico
agendamento.post('/cadastro/:id', 
  validation.validarUserId, 
  validation.validarCadastroAgendamento, 
  controller.criarAgendamento
);

// Buscar agendamento específico por ID
agendamento.get('/buscar/:id', 
  validation.validarId, 
  controller.buscarAgendamento
);

// Buscar todos os agendamentos de um usuário específico
agendamento.get('/usuario/:userId', 
  validation.validarUserId, 
  controller.buscarAgendamentosPorUsuario
);

// Buscar todos os agendamentos (admin/geral)
agendamento.get('/todos', 
  controller.buscarTodosAgendamentos
);

// Contar agendamentos de um usuário específico
agendamento.get('/usuario/:userId/count', 
  validation.validarUserId, 
  controller.contarAgendamentosPorUsuario
);

// Atualizar agendamento específico
agendamento.put('/atualizar/:id', 
  validation.validarId, 
  validation.validarCamposAtualizacao, 
  controller.atualizarAgendamento
);

// Deletar agendamento específico
agendamento.delete('/deletar/:id', 
  validation.validarId, 
  controller.deletarAgendamento
);

export default agendamento;