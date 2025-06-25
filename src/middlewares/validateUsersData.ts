import { Request, Response, NextFunction } from 'express';

function validarCadastroUsuario(req: Request, res: Response, next: NextFunction): void {
  try {
    const { name, email, password, cpf, dateNascimento, phone, cartaoSus, estado, cidade, cep } = req.body;
    
    console.log('Dados recebidos no cadastro:', {
      name,
      email,
      password,
      cpf,
      dateNascimento,
      phone,
      cartaoSus,
      estado,
      cidade,
      cep
    });

    if (!name || !email || !password || !cpf || !dateNascimento || !phone || !cartaoSus || !estado || !cidade || !cep) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
      return;
    }
    
    next();
  } catch (error) {
    console.error('Erro no middleware de validação de cadastro:', error);
    res.status(500).json({ error: 'Erro interno na validação dos dados do usuário.' });
  }
}

function validarLoginUsers(req: Request, res: Response, next: NextFunction): void {
  try {
    const { cpf, password } = req.body;

    if (!cpf || !password) {
      res.status(400).json({ error: 'CPF e senha são obrigatórios.' });
      return;
    }
    
    next();
  } catch (error) {
    console.error('Erro no middleware de validação de login:', error);
    res.status(500).json({ error: 'Erro interno na validação dos dados do usuário.' });
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

function validarCamposAtualizacao(req: Request, res: Response, next: NextFunction): void {
  try {
    const { name, email, password, cpf, dateNascimento, phone, cartaoSus, estado, cidade, cep } = req.body;

    if (!(name || email || password || cpf || dateNascimento || phone || cartaoSus || estado || cidade || cep)) {
      res.status(400).json({ error: 'Pelo menos um campo é obrigatório para atualização.' });
      return;
    }
    
    next();
  } catch (error) {
    console.error('Erro no middleware de validação de atualização:', error);
    res.status(500).json({ error: 'Erro interno na validação dos dados de atualização.' });
  }
}

export default { validarCadastroUsuario, validarLoginUsers, validarId, validarCamposAtualizacao };