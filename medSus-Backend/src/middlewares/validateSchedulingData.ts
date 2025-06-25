import { Request, Response, NextFunction } from 'express';

function validarCriarAgendamento(req: Request, res: Response, next: NextFunction): void {
  const { date_scheduling, type, sus, latitude, longitude } = req.body;
  const userId = req.params.userId;  // Acessando diretamente o userId da URL

  if (!date_scheduling || !type || !sus || latitude === undefined || longitude === undefined || !userId) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios: date_scheduling, type, sus, latitude, longitude, userId.' });
    return;
  }

  // Validação básica dos tipos
  if (isNaN(Date.parse(date_scheduling))) {
    res.status(400).json({ error: 'O campo "date_scheduling" deve ser uma data válida (YYYY-MM-DD).' });
    return;
  }

  if (typeof type !== 'string' || typeof sus !== 'string' || typeof latitude !== 'number' || typeof longitude !== 'number') {
    res.status(400).json({ error: 'Campos com tipos inválidos.' });
    return;
  }

  next();
}


function validarAtualizarAgendamento(req: Request, res: Response, next: NextFunction): void {
  const { date_scheduling, type, latitude, longitude } = req.body;

  if (!date_scheduling && !type && latitude === undefined && longitude === undefined) {
    res.status(400).json({ error: 'Forneça pelo menos um campo para atualizar: date_scheduling, type, latitude ou longitude.' });
    return;
  }

  next();
}

function validarBuscarOuDeletarPorId(req: Request, res: Response, next: NextFunction): void {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    res.status(400).json({ error: 'O ID fornecido é inválido.' });
    return;
  }

  next();
}

export default {
  validarCriarAgendamento,
  validarAtualizarAgendamento,
  validarBuscarOuDeletarPorId
};