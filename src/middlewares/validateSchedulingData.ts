import { Request, Response, NextFunction } from 'express';

function validarCadastroAgendamento(req: Request, res: Response, next: NextFunction): void {
  try {
    const idUsers = req.params.id;
    if (!idUsers || isNaN(Number(idUsers))) {
      res.status(400).json({ error: 'ID do usuário é obrigatório e deve ser um número válido.' });
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

    // Validar campos obrigatórios (observation é opcional)
    if (!date_scheduling || !type || !local || !medico) {
      res.status(400).json({ 
        error: 'Os campos date_scheduling, type, local e medico são obrigatórios.' 
      });
      return;
    }

    // Validar formato da data
    const dataAgendamento = new Date(date_scheduling);
    if (isNaN(dataAgendamento.getTime())) {
      res.status(400).json({ 
        error: 'date_scheduling deve ter um formato de data válido (YYYY-MM-DD HH:MM:SS).' 
      });
      return;
    }

    // Validar se a data não é no passado
    const agora = new Date();
    if (dataAgendamento < agora) {
      res.status(400).json({ 
        error: 'date_scheduling não pode ser uma data passada.' 
      });
      return;
    }

    // Validar tamanhos dos campos conforme banco de dados
    if (type.length > 100) {
      res.status(400).json({ 
        error: 'O campo type deve ter no máximo 100 caracteres.' 
      });
      return;
    }

    if (local.length > 200) {
      res.status(400).json({ 
        error: 'O campo local deve ter no máximo 200 caracteres.' 
      });
      return;
    }

    if (medico.length > 150) {
      res.status(400).json({ 
        error: 'O campo medico deve ter no máximo 150 caracteres.' 
      });
      return;
    }

    // Validar observation se fornecido (campo opcional)
    if (observation && typeof observation !== 'string') {
      res.status(400).json({ 
        error: 'O campo observation deve ser uma string.' 
      });
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

    // Validar se é um número positivo
    const numId = Number(id);
    if (numId <= 0) {
      res.status(400).json({ error: 'ID deve ser um número positivo.' });
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
    const idUsers = req.params.id || req.params.userId; // Suporte para ambos os parâmetros
    
    if (!idUsers || isNaN(Number(idUsers))) {
      res.status(400).json({ error: 'ID do usuário válido é obrigatório.' });
      return;
    }

    // Validar se é um número positivo
    const numId = Number(idUsers);
    if (numId <= 0) {
      res.status(400).json({ error: 'ID do usuário deve ser um número positivo.' });
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

    // Verificar se pelo menos um campo foi fornecido
    if (!(date_scheduling || type || local || medico || observation !== undefined)) {
      res.status(400).json({ 
        error: 'Pelo menos um campo é obrigatório para atualização.' 
      });
      return;
    }

    // Validar campos individualmente se fornecidos
    if (date_scheduling) {
      const dataAgendamento = new Date(date_scheduling);
      if (isNaN(dataAgendamento.getTime())) {
        res.status(400).json({ 
          error: 'date_scheduling deve ter um formato de data válido.' 
        });
        return;
      }

      // Validar se a data não é no passado
      const agora = new Date();
      if (dataAgendamento < agora) {
        res.status(400).json({ 
          error: 'date_scheduling não pode ser uma data passada.' 
        });
        return;
      }
    }

    if (type && type.length > 100) {
      res.status(400).json({ 
        error: 'O campo type deve ter no máximo 100 caracteres.' 
      });
      return;
    }

    if (local && local.length > 200) {
      res.status(400).json({ 
        error: 'O campo local deve ter no máximo 200 caracteres.' 
      });
      return;
    }

    if (medico && medico.length > 150) {
      res.status(400).json({ 
        error: 'O campo medico deve ter no máximo 150 caracteres.' 
      });
      return;
    }

    if (observation !== undefined && observation !== null && typeof observation !== 'string') {
      res.status(400).json({ 
        error: 'O campo observation deve ser uma string.' 
      });
      return;
    }
    
    next();
  } catch (error) {
    console.error('Erro no middleware de validação de atualização:', error);
    res.status(500).json({ error: 'Erro interno na validação dos dados de atualização.' });
  }
}

// Middleware adicional para validar tipos de agendamento (opcional)
function validarTipoAgendamento(tiposPermitidos: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const { type } = req.body;
      
      if (type && !tiposPermitidos.includes(type.toLowerCase())) {
        res.status(400).json({ 
          error: `Tipo de agendamento inválido. Tipos permitidos: ${tiposPermitidos.join(', ')}` 
        });
        return;
      }
      
      next();
    } catch (error) {
      console.error('Erro no middleware de validação de tipo:', error);
      res.status(500).json({ error: 'Erro interno na validação do tipo de agendamento.' });
    }
  };
}

export default {
  validarCadastroAgendamento,
  validarId,
  validarUserId,
  validarCamposAtualizacao,
  validarTipoAgendamento
};