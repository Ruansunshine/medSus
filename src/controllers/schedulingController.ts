import { Request, Response } from "express";
import SchedulingRepository from "../repository/schedulingRepository";

// Instância do repositório
const schedulingRepository = new SchedulingRepository();

// Criar agendamento
async function criarAgendamento(req: Request, res: Response): Promise<void> {
  try {
    const { date_scheduling, type, local, medico, observation } = req.body;
    const usuario_id = parseInt(req.params.id);

    // Validação básica
    if (!date_scheduling || !type || !local || !medico || !usuario_id) {
      res.status(400).json({
        error: "Campos obrigatórios: date_scheduling, type, local, medico, usuario_id",
      });
      return;
    }

    const novoAgendamento = await schedulingRepository.create({
      date_scheduling,
      type,
      local,
      medico,
      usuario_id,
      observation: observation || null,
    });

    res.status(201).json({
      message: "Agendamento criado com sucesso.",
      scheduling: novoAgendamento,
    });
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    res.status(500).json({
      error: "Erro interno ao criar agendamento.",
      detalhes: (error as Error).message,
    });
  }
}

// Buscar agendamento por ID
async function buscarAgendamento(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido." });
      return;
    }

    const resultado = await schedulingRepository.findById(id);

    if (!resultado) {
      res.status(404).json({ error: "Agendamento não encontrado." });
    } else {
      res.status(200).json({
        message: "Agendamento encontrado com sucesso.",
        scheduling: resultado,
      });
    }
  } catch (error) {
    console.error("Erro ao buscar agendamento:", error);
    res.status(500).json({ error: "Erro interno ao buscar agendamento." });
  }
}

// Atualizar agendamento
async function atualizarAgendamento(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    const { date_scheduling, type, local, medico, observation } = req.body;

    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido." });
      return;
    }

    // Verificar se o agendamento existe
    const agendamentoExiste = await schedulingRepository.exists(id);
    if (!agendamentoExiste) {
      res.status(404).json({ error: "Agendamento não encontrado." });
      return;
    }

    const resultado = await schedulingRepository.update(id, {
      date_scheduling,
      type,
      local,
      medico,
      observation,
    });

    if (!resultado) {
      res.status(400).json({ error: "Nenhum campo foi atualizado." });
    } else {
      const agendamentoAtualizado = await schedulingRepository.findById(id);
      res.status(200).json({
        message: "Agendamento atualizado com sucesso.",
        scheduling: agendamentoAtualizado,
      });
    }
  } catch (error) {
    console.error("Erro ao atualizar agendamento:", error);
    res.status(500).json({ error: "Erro interno ao atualizar agendamento." });
  }
}

// Deletar agendamento
async function deletarAgendamento(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: "ID inválido." });
      return;
    }

    const resultado = await schedulingRepository.delete(id);

    if (!resultado) {
      res.status(404).json({ error: "Agendamento não encontrado." });
    } else {
      res.status(200).json({ message: "Agendamento excluído com sucesso." });
    }
  } catch (error) {
    console.error("Erro ao deletar agendamento:", error);
    res.status(500).json({ error: "Erro interno ao deletar agendamento." });
  }
}

// Buscar agendamentos por usuário
async function buscarAgendamentosPorUsuario(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = parseInt(req.params.userId);

    if (isNaN(userId)) {
      res.status(400).json({ error: "ID do usuário inválido." });
      return;
    }

    const resultado = await schedulingRepository.findByUserId(userId);

    res.status(200).json({
      message: `${resultado.length} agendamento(s) encontrado(s) para o usuário.`,
      scheduling: resultado,
      total: resultado.length,
    });
  } catch (error) {
    console.error("Erro ao buscar agendamentos do usuário:", error);
    res
      .status(500)
      .json({ error: "Erro interno ao buscar agendamentos do usuário." });
  }
}

// Buscar todos os agendamentos
async function buscarTodosAgendamentos(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const resultado = await schedulingRepository.findAll();

    res.status(200).json({
      message: `${resultado.length} agendamento(s) encontrado(s).`,
      scheduling: resultado,
      total: resultado.length,
    });
  } catch (error) {
    console.error("Erro ao buscar todos os agendamentos:", error);
    res
      .status(500)
      .json({ error: "Erro interno ao buscar todos os agendamentos." });
  }
}

// Contar agendamentos por usuário
async function contarAgendamentosPorUsuario(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = parseInt(req.params.userId);

    if (isNaN(userId)) {
      res.status(400).json({ error: "ID do usuário inválido." });
      return;
    }

    const total = await schedulingRepository.countByUserId(userId);

    res.status(200).json({
      message: "Contagem realizada com sucesso.",
      usuario_id: userId,
      total_agendamentos: total,
    });
  } catch (error) {
    console.error("Erro ao contar agendamentos do usuário:", error);
    res
      .status(500)
      .json({ error: "Erro interno ao contar agendamentos do usuário." });
  }
}

// EXPORT DO CONTROLLER
export default {
  criarAgendamento,
  buscarAgendamento,
  atualizarAgendamento,
  deletarAgendamento,
  buscarAgendamentosPorUsuario,
  buscarTodosAgendamentos,
  contarAgendamentosPorUsuario,
};