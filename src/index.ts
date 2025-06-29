import express from 'express';
import cors from 'cors';
import './config/database';
import router from './routes/usersRoutes';
import schedulingRoutes from './routes/schedulingRoutes';
const app = express();
const PORT = 3000;

app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:5500', 'http://127.0.0.1:5500']  // Permitir requisições de http://localhost:3001
}));

app.use(express.json());

app.use('/api/users', router);
app.use('/api/scheduling', schedulingRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
