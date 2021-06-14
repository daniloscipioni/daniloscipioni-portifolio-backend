// @ts-nocheck
/**
 * Arquivo: src/routes/machine.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Machine'.
 * Data: 04/03/2020
 * Author Glaucia Lemos
 */

const router = require('express-promise-router')();
const jwt = require('jsonwebtoken');
const usersController = require('../controllers/users.controller');

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns autenticação JWT
 */
// eslint-disable-next-line consistent-return
function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'Necessário uso de um token!' });

  // eslint-disable-next-line consistent-return
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    // eslint-disable-next-line no-console
    // console.log(err);

    if (err) return res.status(403).json({ message: 'Token Expirado ou token inválido!' });

    req.userId = decoded.id;
    next();
  });
}

router.get('/users', verifyJWT, usersController.listAllUsers);

/**
 * Função de login
 */
// eslint-disable-next-line consistent-return
router.post('/login', async (req, res, next) => {
  const user = await usersController.searchUser(req.body);
  // Tempo de vida util do token
  const expiresIn = 900;

  // esse teste abaixo deve ser feito no seu banco de dados
  if (user.rowCount > 0) {
    const id = user.data[0].user_id; // esse id viria do banco de dados
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn, // expires in 5min
    });

    return res.json({ auth: true, token, expiresIn: `${expiresIn}seg` });
  }

  res.status(500).json({ message: 'Login inválido!' });
});

module.exports = router;
