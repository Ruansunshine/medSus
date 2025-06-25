import { Request, Response, NextFunction } from 'express';

function validarCadastroAgendamento(req: Request, res: Response, next: NextFunction): void {
  try {
    const idUsers = req.params.id;
    if (!idUsers || isNaN(Number(idUsers))) {
      res.status(400).json({ error: 'ID do usuário é obrigatório.' });
      return;
    }
    const { date_scheduling, type, local, medico, observation } = req.body;
        
    console.log('Dados recebidos no cadastro de agendamento:', {
      date_scheduling,
      type,
      local,
      medico,
      observation
    });

    if (!date_scheduling || !type || !local || !medico || !observation) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      return;
    }
        
    next();
  } catch (error) {
    console.error('Erro no middleware de validação de cadastro de agendamento:', error);
    res.status(500).json({ error: 'Erro interno na validação dos dados do agendamento.' });
  }
}

function validarId(req: Request, res: Response, next: NextFunction): void {
  try {
    const { id } = req.params;
        
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ error: 'ID válido é obrigatório.' });
      return;
    }
        
    next();
  } catch (error) {
    console.error('Erro no middleware de validação de ID:', error);
    res.status(500).json({ error: 'Erro interno na validação do ID.' });
  }
}

function validarUserId(req: Request, res: Response, next: NextFunction): void {
  try {
    const idUsers  = req.params.id;
        
    if (!idUsers|| isNaN(Number(idUsers))) {
      res.status(400).json({ error: 'ID do usuário válido é obrigatório.' });
      return;
    }
        
    next();
  } catch (error) {
    console.error('Erro no middleware de validação de ID do usuário:', error);
    res.status(500).json({ error: 'Erro interno na validação do ID do usuário.' });
  }
}

function validarCamposAtualizacao(req: Request, res: Response, next: NextFunction): void {
  try {
    const { date_scheduling, type, local, medico, observation } = req.body;

    if (!(date_scheduling || type || local || medico || observation)) {
      res.status(400).json({ error: 'Pelo menos um campo é obrigatório para atualização.' });
      return;
    }
        
    next();
  } catch (error) {
    console.error('Erro no middleware de validação de atualização:', error);
    res.status(500).json({ error: 'Erro interno na validação dos dados de atualização.' });
  }
}

export default {
  validarCadastroAgendamento,
  validarId,
  validarUserId,
  validarCamposAtualizacao
};