import { Request, Response } from 'express';
import Scheduling from '../models/Scheduling';

// Criar agendamento
async function criarAgendamento(req: Request, res: Response): Promise<void> {
  try {
    const { date_scheduling, type, sus, latitude, longitude} = req.body;
    const userId = parseInt(req.params.userId);

    const agendamento = new Scheduling(0, date_scheduling, type, sus, latitude, longitude, userId);
    const novoAgendamento = await agendamento.createScheduling(date_scheduling, type, sus, latitude, longitude, userId);

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

    const resultado = await Scheduling.readScheduling(id);

    if (resultado.error) {
      res.status(404).json({ error: resultado.error });
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
    const { date_scheduling, type, latitude, longitude } = req.body;

    const resultado = await Scheduling.updateScheduling(id, date_scheduling, type, latitude, longitude);

    if (resultado.error) {
      res.status(404).json({ error: resultado.error });
    } else {
      res.status(200).json({ message: resultado.message });
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

    const resultado = await Scheduling.deleteScheduling(id);

    if (resultado.error) {
      res.status(404).json({ error: resultado.error });
    } else {
      res.status(200).json({ message: resultado.message });
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