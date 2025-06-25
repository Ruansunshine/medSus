import 'dotenv/config'
import mysql from 'mysql2/promise';
 
// Criar uma conexão com o banco de dados
const conexao = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Estabelecer a conexão
async function testarConexao() {
  try {
    await conexao.getConnection(); // Tenta obter uma conexão do pool
    console.log('Conectado ao MySQL!');
  } catch (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    process.exit(1); // Sai do processo se não conseguir conectar
  }
}

// Testar a conexão ao iniciar
testarConexao();

export default conexao;
