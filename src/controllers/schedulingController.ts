import { Request, Response } from 'express';
import SchedulingRepository from '../repository/schedulingRepository';
import schedulingRepository from '../repository/schedulingRepository';

// Criar agendamento
async function criarAgendamento(req: Request, res: Response): Promise<void> {
  try {
    const { date_scheduling, type, local, medico, observation } = req.body;
    const usuario_id = parseInt(req.params.id);

    const novoAgendamento = await SchedulingRepository.create({
      date_scheduling,
      type,
      local,
      medico,
      usuario_id,
      observation
    });

    res.status(201).json({
      message: 'Agendamento criado com sucesso.',
      scheduling: novoAgendamento,
    });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({
      error: 'Erro interno ao criar agendamento.',
      detalhes: (error as Error).message,
    });
  }
}

// Buscar agendamento por ID
async function buscarAgendamento(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);

    const resultado = await SchedulingRepository.findById(id);

    if (!resultado) {
      res.status(404).json({ error: 'Agendamento não encontrado.' });
    } else {
      res.status(200).json({ message: 'Agendamento encontrado com sucesso.', scheduling: resultado });
    }
  } catch (error) {
    console.error('Erro ao buscar agendamento:', error);
    res.status(500).json({ error: 'Erro interno ao buscar agendamento.' });
  }
}

// Atualizar agendamento
async function atualizarAgendamento(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    const { date_scheduling, type, local, medico, observation } = req.body;

    const resultado = await SchedulingRepository.update(id, {
      date_scheduling,
      type,
      local,
      medico,
      observation
    });

    if (!resultado) {
      res.status(404).json({ error: 'Agendamento não encontrado.' });
    } else {
      const agendamentoAtualizado = await SchedulingRepository.findById(id);
      res.status(200).json({ message: 'Agendamento atualizado com sucesso.', 
        schedulingRepository: agendamentoAtualizado
       });
      
    }
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar agendamento.' });
  }
}

// Deletar agendamento
async function deletarAgendamento(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);

    const resultado = await SchedulingRepository.delete(id);

    if (!resultado) {
      res.status(404).json({ error: 'Agendamento não encontrado.' });
    } else {
      res.status(200).json({ message: 'Agendamento excluído com sucesso.' });
    }
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error);
    res.status(500).json({ error: 'Erro interno ao deletar agendamento.' });
  }
}

export default {
  criarAgendamento,
  buscarAgendamento,
  atualizarAgendamento,
  deletarAgendamento
};