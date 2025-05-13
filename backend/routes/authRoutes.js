const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.login);
router.post('/cadastrar', authController.cadastrarUsuario);
router.get('/funcionarios', authController.listarFuncionarios);
router.delete('/excluir-funcionario', authController.excluirFuncionario);

module.exports = router;