import conexao from "../config/database";
import { User } from "../models/Users";
//consultas no banco de dados para users
class UserRepository {
  public async create(user: User): Promise<User> {
    try {
      const sql = `INSERT INTO users (name, email, password, cpf, date, phone, cartaoSus, estado, cidade, cep) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const valores = [user.name, user.email, user.password, user.cpf, user.dateNascimento, user.phone, user.cartaoSus, user.estado, user.cidade, user.cep];
      const [resultado]: any = await conexao.execute(sql, valores);
      
      return { ...user, id: resultado.insertId };
    } catch (error) {
      console.error("Erro ao inserir usuário:", error);
      throw error;
    }
  }

  public async login(cpf: string, password: string): Promise<User | null> {
    try {
      const sql = `SELECT * FROM users WHERE cpf = ? AND password = ?`;
      const [rows]: any = await conexao.execute(sql, [cpf, password]);
      
      if (rows.length > 0) {
        const user = rows[0];
        return {
          id: user.users_id,
          name: user.name,
          email: user.email,
          password: user.password,
          cpf: user.cpf,
          dateNascimento: user.date,
          phone: user.phone,
          cartaoSus: user.cartaoSus,
          estado: user.estado,
          cidade: user.cidade,
          cep: user.cep
        };
      }
      return null;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }

  public async findById(id: number): Promise<User | null> {
    try {
      const sql = `SELECT * FROM users WHERE users_id = ?`;
      const [rows]: any = await conexao.execute(sql, [id]);
      
      if (rows.length > 0) {
        const user = rows[0];
        return {
          id: user.users_id,
          name: user.name,
          email: user.email,
          password: user.password,
          cpf: user.cpf,
          dateNascimento: user.date,
          phone: user.phone,
          cartaoSus: user.cartaoSus,
          estado: user.estado,
          cidade: user.cidade,
          cep: user.cep
        };
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  }

  public async update(id: number, userData: Partial<User>): Promise<boolean> {
    try {
      const fieldsToUpdate: string[] = [];
      const values: any[] = [];

      if (userData.name) {
        fieldsToUpdate.push("name = ?");
        values.push(userData.name);
      }
      if (userData.email) {
        fieldsToUpdate.push("email = ?");
        values.push(userData.email);
      }
      if (userData.password) {
        fieldsToUpdate.push("password = ?");
        values.push(userData.password);
      }
      if (userData.cpf) {
        fieldsToUpdate.push("cpf = ?");
        values.push(userData.cpf);
      }
      if (userData.dateNascimento) {
        fieldsToUpdate.push("date = ?");
        values.push(userData.dateNascimento);
      }
      if (userData.phone) {
        fieldsToUpdate.push("phone = ?");
        values.push(userData.phone);
      }
      if (userData.cartaoSus) {
        fieldsToUpdate.push("cartaoSus = ?");
        values.push(userData.cartaoSus);
      }
      if (userData.estado) {
        fieldsToUpdate.push("estado = ?");
        values.push(userData.estado);
      }
      if (userData.cidade) {
        fieldsToUpdate.push("cidade = ?");
        values.push(userData.cidade);
      }
      if (userData.cep) {
        fieldsToUpdate.push("cep = ?");
        values.push(userData.cep);
      }

      if (fieldsToUpdate.length === 0) {
        return false;
      }

      values.push(id);
      const sql = `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE users_id = ?`;
      const [resultado]: any = await conexao.execute(sql, values);
      
      return resultado.affectedRows > 0;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      const sql = `DELETE FROM users WHERE users_id = ?`;
      const [resultado]: any = await conexao.execute(sql, [id]);
      
      return resultado.affectedRows > 0;
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      throw error;
    }
  }
}

export default new UserRepository();