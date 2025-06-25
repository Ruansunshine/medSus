import conexao from "../config/database";

class Scheduling {
  private scheduling_id: number;
  private date_scheduling: string;
  private type: string;
  private sus: string;
  private latitude: number;
  private longitude: number;
  private users_users_id: number;
  

  constructor(
    scheduling_id: number,
    date_scheduling: string,
    type: string,
    sus:string, 
    latitude: number,
    longitude: number,
    users_users_id: number
  ) {
    this.scheduling_id = scheduling_id;
    this.date_scheduling = date_scheduling;
    this.type = type;
    this.sus = sus;
    this.latitude = latitude;
    this.longitude = longitude;
    this.users_users_id = users_users_id;
  }

  // Criar novo agendamento
  public async createScheduling(
  date_scheduling: string,
  type: string,
  sus: string,
  latitude: number,
  longitude: number,
  users_users_id: number
): Promise<Scheduling> {
  try {
    const sql = `
      INSERT INTO scheduling (date_scheduling, type, sus, latitude, longitude, users_users_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [date_scheduling, type, sus, latitude, longitude, users_users_id];
    const [result]: any = await conexao.execute(sql, values);
    const insertId = result.insertId;

    if (insertId) {
      return new Scheduling(insertId, date_scheduling, type, sus, latitude, longitude, users_users_id);
    } else {
      throw new Error('Erro ao inserir agendamento.');
    }
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    throw error;
  }
}


  // Buscar agendamento por ID
  public static async readScheduling(id: number): Promise<any> {
    try {
      const sql = `SELECT * FROM scheduling WHERE scheduling_id = ?`;
      const [rows]: any = await conexao.execute(sql, [id]);
      return rows.length ? rows[0] : { error: 'Agendamento não encontrado.' };
    } catch (error) {
      console.error('Erro ao buscar agendamento:', error);
      return { error: 'Erro interno ao buscar agendamento.' };
    }
  }

  // Atualizar agendamento
  public static async updateScheduling(
    id: number,
    date_scheduling?: string,
    type?: string,
    latitude?: number,
    longitude?: number
  ): Promise<any> {
    try {
      const fieldsToUpdate: string[] = [];
      const values: any[] = [];

      if (date_scheduling) {
        fieldsToUpdate.push('date_scheduling = ?');
        values.push(date_scheduling);
      }
      if (type) {
        fieldsToUpdate.push('type = ?');
        values.push(type);
      }
      if (latitude !== undefined) {
        fieldsToUpdate.push('latitude = ?');
        values.push(latitude);
      }
      if (longitude !== undefined) {
        fieldsToUpdate.push('longitude = ?');
        values.push(longitude);
      }

      if (fieldsToUpdate.length === 0) {
        return { error: 'Nenhum campo fornecido para atualização.' };
      }

      values.push(id);
      const sql = `UPDATE scheduling SET ${fieldsToUpdate.join(', ')} WHERE scheduling_id = ?`;
      const [result]: any = await conexao.execute(sql, values);

      return result.affectedRows > 0
        ? { message: 'Agendamento atualizado com sucesso.' }
        : { error: 'Agendamento não encontrado.' };
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
      return { error: 'Erro interno ao atualizar agendamento.' };
    }
  }

  // Deletar agendamento
  public static async deleteScheduling(id: number): Promise<any> {
    try {
      const sql = `DELETE FROM scheduling WHERE scheduling_id = ?`;
      const [result]: any = await conexao.execute(sql, [id]);

      return result.affectedRows > 0
        ? { message: 'Agendamento excluído com sucesso.' }
        : { error: 'Agendamento não encontrado.' };
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
      return { error: 'Erro interno ao deletar agendamento.' };
    }
  }
}

export default Scheduling;