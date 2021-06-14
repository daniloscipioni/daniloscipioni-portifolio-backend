// @ts-nocheck
/**
 * Arquivo: src/routes/machine.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Machine'.
 * Data: 04/03/2020
 * Author Glaucia Lemos
 */

const router = require('express-promise-router')();
const jwt = require('../config/jwt');
const usersController = require('../controllers/users.controller');

router.get('/users', jwt.verifyJWT, usersController.listAllUsers);

/**
 * Função de login
 */
// eslint-disable-next-line consistent-return
router.post('/login', async (req, res, next) => {
  const user = await usersController.searchUser(req.body);
  // Tempo de vida util do token

  // esse teste abaixo deve ser feito no seu banco de dados
  if (user.rowCount > 0) {
    const id = user.data[0].user_id;
    const validation = jwt.jwtSignin(id);
    return res.json({ auth: true, token: validation.token, expiresIn: `${validation.expiresIn}sec` });
  }

  res.status(500).json({ message: 'Login inválido!' });
});

module.exports = router;
