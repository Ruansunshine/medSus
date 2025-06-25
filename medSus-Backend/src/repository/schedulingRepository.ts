import conexao from "../config/database";
import { Scheduling } from "../models/Scheduling";

//consultas no banco de dados para scheduling
class SchedulingRepository {
  public async create(scheduling: Omit<Scheduling, 'id'>): Promise<Scheduling> {
    try {
      const sql = `INSERT INTO scheduling (date_scheduling, type, local, medico, usuario_id, observation) VALUES (?, ?, ?, ?, ?, ?)`;
      const valores = [scheduling.date_scheduling, scheduling.type, scheduling.local, scheduling.medico, scheduling.usuario_id, scheduling.observation];
      const [resultado]: any = await conexao.execute(sql, valores);
      
      return { ...scheduling, id: resultado.insertId };
    } catch (error) {
      console.error("Erro ao inserir agendamento:", error);
      throw error;
    }
  }

  public async findById(id: number): Promise<Scheduling | null> {
    try {
      const sql = `SELECT * FROM scheduling WHERE id = ?`;
      const [rows]: any = await conexao.execute(sql, [id]);
      
      if (rows.length > 0) {
        const scheduling = rows[0];
        return {
          id: scheduling.id,
          date_scheduling: scheduling.date_scheduling,
          type: scheduling.type,
          local: scheduling.local,
          medico: scheduling.medico,
          usuario_id: scheduling.usuario_id,
          observation: scheduling.observation
        };
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
      
      return rows.map((scheduling: any) => ({
        id: scheduling.id,
        date_scheduling: scheduling.date_scheduling,
        type: scheduling.type,
        local: scheduling.local,
        medico: scheduling.medico,
        usuario_id: scheduling.usuario_id,
        observation: scheduling.observation
      }));
    } catch (error) {
      console.error("Erro ao buscar agendamentos do usuário:", error);
      throw error;
    }
  }

  public async findAll(): Promise<Scheduling[]> {
    try {
      const sql = `SELECT * FROM scheduling ORDER BY date_scheduling DESC`;
      const [rows]: any = await conexao.execute(sql);
      
      return rows.map((scheduling: any) => ({
        id: scheduling.id,
        date_scheduling: scheduling.date_scheduling,
        type: scheduling.type,
        local: scheduling.local,
        medico: scheduling.medico,
        usuario_id: scheduling.usuario_id,
        observation: scheduling.observation
      }));
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      throw error;
    }
  }

  public async update(id: number, schedulingData: Partial<Omit<Scheduling, 'id'>>): Promise<boolean> {
    try {
      const fieldsToUpdate: string[] = [];
      const values: any[] = [];

      if (schedulingData.date_scheduling) {
        fieldsToUpdate.push("date_scheduling = ?");
        values.push(schedulingData.date_scheduling);
      }
      if (schedulingData.type) {
        fieldsToUpdate.push("type = ?");
        values.push(schedulingData.type);
      }
      if (schedulingData.local) {
        fieldsToUpdate.push("local = ?");
        values.push(schedulingData.local);
      }
      if (schedulingData.medico) {
        fieldsToUpdate.push("medico = ?");
        values.push(schedulingData.medico);
      }
      if (schedulingData.usuario_id) {
        fieldsToUpdate.push("usuario_id = ?");
        values.push(schedulingData.usuario_id);
      }
      if (schedulingData.observation) {
        fieldsToUpdate.push("observation = ?");
        values.push(schedulingData.observation);
      }

      if (fieldsToUpdate.length === 0) {
        return false;
      }

      values.push(id);
      const sql = `UPDATE scheduling SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
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
}

export default new SchedulingRepository();