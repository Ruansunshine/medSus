import conexao from "../config/database";
import { Scheduling } from "../models/Scheduling";

// Consultas no banco de dados para scheduling
class SchedulingRepository {
  public async create(scheduling: Omit<Scheduling, "id">): Promise<Scheduling> {
    try {
      const sql = `INSERT INTO scheduling (date_scheduling, type, local, medico, usuario_id, observation) VALUES (?, ?, ?, ?, ?, ?)`;
      const valores = [
        scheduling.date_scheduling,
        scheduling.type,
        scheduling.local,
        scheduling.medico,
        scheduling.usuario_id,
        scheduling.observation,
      ];
      const [resultado]: any = await conexao.execute(sql, valores);

      return { ...scheduling, id: resultado.insertId };
    } catch (error) {
      console.error("Erro ao inserir agendamento:", error);
      throw error;
    }
  }

  public async findById(id: number): Promise<Scheduling | null> {
    try {
      const sql = `SELECT * FROM scheduling WHERE usuario_id = ?`;
      const [rows]: any = await conexao.execute(sql, [id]);

      if (rows.length > 0) {
        return this.mapRowToScheduling(rows[0]);
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar agendamento:", error);
      throw error;
    }
  }

  public async findByUserId(usuario_id: number): Promise<Scheduling[]> {
    try {
      const sql = `SELECT * FROM scheduling WHERE usuario_id = ? ORDER BY date_scheduling DESC`;
      const [rows]: any = await conexao.execute(sql, [usuario_id]);

      return rows.map((row: any) => this.mapRowToScheduling(row));
    } catch (error) {
      console.error("Erro ao buscar agendamentos do usuário:", error);
      throw error;
    }
  }

  public async findAll(): Promise<Scheduling[]> {
    try {
      const sql = `SELECT * FROM scheduling ORDER BY date_scheduling DESC`;
      const [rows]: any = await conexao.execute(sql);

      return rows.map((row: any) => this.mapRowToScheduling(row));
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      throw error;
    }
  }

  public async update(
    id: number,
    schedulingData: Partial<Omit<Scheduling, "id">>
  ): Promise<boolean> {
    try {
      const fieldsToUpdate: string[] = [];
      const values: any[] = [];

      // Mapear campos para atualização
      const fieldMap = {
        date_scheduling: "date_scheduling",
        type: "type",
        local: "local",
        medico: "medico",
        usuario_id: "usuario_id",
        observation: "observation",
      };

      Object.entries(fieldMap).forEach(([key, dbField]) => {
        if (schedulingData[key as keyof typeof schedulingData] !== undefined) {
          fieldsToUpdate.push(`${dbField} = ?`);
          values.push(schedulingData[key as keyof typeof schedulingData]);
        }
      });

      if (fieldsToUpdate.length === 0) {
        return false;
      }

      values.push(id);
      const sql = `UPDATE scheduling SET ${fieldsToUpdate.join(
        ", "
      )} WHERE id = ?`;
      const [resultado]: any = await conexao.execute(sql, values);

      return resultado.affectedRows > 0;
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
      throw error;
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      const sql = `DELETE FROM scheduling WHERE id = ?`;
      const [resultado]: any = await conexao.execute(sql, [id]);

      return resultado.affectedRows > 0;
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
      throw error;
    }
  }

  // Método auxiliar para mapear dados do banco para o modelo
  private mapRowToScheduling(row: any): Scheduling {
    return {
      id: row.id,
      date_scheduling: row.date_scheduling,
      type: row.type,
      local: row.local,
      medico: row.medico,
      usuario_id: row.usuario_id,
      observation: row.observation,
    };
  }

  // Método para verificar se existe um agendamento
  public async exists(id: number): Promise<boolean> {
    try {
      const sql = `SELECT 1 FROM scheduling WHERE id = ? LIMIT 1`;
      const [rows]: any = await conexao.execute(sql, [id]);
      return rows.length > 0;
    } catch (error) {
      console.error("Erro ao verificar existência do agendamento:", error);
      throw error;
    }
  }

  // Método para contar agendamentos por usuário
  public async countByUserId(usuario_id: number): Promise<number> {
    try {
      const sql = `SELECT COUNT(*) as total FROM scheduling WHERE usuario_id = ?`;
      const [rows]: any = await conexao.execute(sql, [usuario_id]);
      return rows[0].total;
    } catch (error) {
      console.error("Erro ao contar agendamentos do usuário:", error);
      throw error;
    }
  }
}

export default SchedulingRepository;