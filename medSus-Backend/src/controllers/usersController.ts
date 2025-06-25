import { Request, Response } from "express";
import userRepository from "../repository/usersRepository";
import { User } from "../models/Users";

async function cadastrarUsuario(req: Request, res: Response): Promise<void> {
  try {
    const {
      name,
      email,
      password,
      cpf,
      dateNascimento,
      phone,
      cartaoSus,
      estado,
      cidade,
      cep,
    } = req.body;

    const userData: User = {
      name,
      email,
      password,
      cpf,
      dateNascimento,
      phone,
      cartaoSus,
      estado,
      cidade,
      cep,
    };

    const usuarioCriado = await userRepository.create(userData);

    res.status(201).json({
      message: "Usuário criado com sucesso.",
      usuario: usuarioCriado,
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({
      error: "Erro interno ao criar usuário.",
      detalhes: (error as Error).message,
    });
  }
}

async function loginUsuario(req: Request, res: Response): Promise<void> {
  try {
    const { cpf, password } = req.body;

    const usuario = await userRepository.login(cpf, password);

    if (!usuario) {
      res.status(400).json({
        error: "Usuário ou senha incorretos.",
      });
      return;
    }

    res.status(200).json({
      message: "Usuário logado com sucesso",
      user: usuario,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({
      error: "Erro interno ao fazer login.",
      detalhes: (error as Error).message,
    });
  }
}

async function buscarUsuario(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const idInt = parseInt(id);

    const usuario = await userRepository.findById(idInt);

    if (!usuario) {
      res.status(404).json({
        error: "Usuário não encontrado.",
      });
      return;
    }

    res.status(200).json({
      message: "Usuário encontrado com sucesso",
      user: usuario,
    });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({
      error: "Erro interno ao encontrar usuário.",
      detalhes: (error as Error).message,
    });
  }
}

async function atualizarUsuario(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const idInt = parseInt(id);
    const {
      name,
      email,
      password,
      cpf,
      dateNascimento,
      phone,
      cartaoSus,
      estado,
      cidade,
      cep,
    } = req.body;

    const userData: Partial<User> = {};

    if (name) userData.name = name;
    if (email) userData.email = email;
    if (password) userData.password = password;
    if (cpf) userData.cpf = cpf;
    if (dateNascimento) userData.dateNascimento = dateNascimento;
    if (phone) userData.phone = phone;
    if (cartaoSus) userData.cartaoSus = cartaoSus;
    if (estado) userData.estado = estado;
    if (cidade) userData.cidade = cidade;
    if (cep) userData.cep = cep;

    const atualizado = await userRepository.update(idInt, userData);

    if (!atualizado) {
      res.status(404).json({
        error:
          "Usuário não encontrado ou nenhum campo fornecido para atualização.",
      });
    } else {
      const usuarioAtualizado = await userRepository.findById(idInt); // novo método
      res.status(200).json({
        message: "Usuário atualizado com sucesso.",
        user: usuarioAtualizado,
      });
    }
  } catch (error) {
    console.error("Erro no controller de atualização:", error);
    res.status(500).json({
      error: "Erro interno ao atualizar o usuário.",
      detalhes: (error as Error).message,
    });
  }
}

async function deletarUsuario(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const idInt = parseInt(id);

    const deletado = await userRepository.delete(idInt);

    if (!deletado) {
      res.status(404).json({
        error: "Usuário não encontrado.",
      });
    } else {
      res.status(200).json({
        message: "Usuário excluído com sucesso.",
      });
    }
  } catch (error) {
    console.error("Erro no controller ao deletar usuário:", error);
    res.status(500).json({
      error: "Erro interno ao deletar o usuário.",
      detalhes: (error as Error).message,
    });
  }
}

export default {
  cadastrarUsuario,
  loginUsuario,
  buscarUsuario,
  atualizarUsuario,
  deletarUsuario,
};
