import { Router } from 'express';
import controller from '../controllers/usersController';
import validation from '../middlewares/validateUsersData';

const   router = Router();
//minhas rotas
router.post('/cadastro', validation.validarCadastroUsuario, controller.cadastrarUsuario);
router.post('/login', validation.validarLoginUsers, controller.loginUsuario);
router.get('/buscar/:id', validation.validarId, controller.buscarUsuario);
router.put('/atualizar/:id', validation.validarId, validation.validarCamposAtualizacao, controller.atualizarUsuario);
router.delete('/deletar/:id', validation.validarId, controller.deletarUsuario);

export default router;