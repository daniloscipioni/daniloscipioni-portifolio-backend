// @ts-nocheck
/**
 * Arquivo: src/routes/machine.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Machine'.
 * Data: 04/03/2020
 * Author Glaucia Lemos
 */

const router = require('express-promise-router')();
const usersController = require('../controllers/users.controller');
const jwt = require('jsonwebtoken');

router.get('/users', verifyJWT, usersController.listAllUsers)


/**
 * Função de login
 */
router.post('/login', async (req, res, next) =>{
  
  const user = await usersController.searchUser(req.body);

 
  //esse teste abaixo deve ser feito no seu banco de dados
  //if (req.body.user === 'daniloscipioni' && req.body.password === 'danilo89') {
    if(user.rowCount > 0){
    //auth ok
    const id = user.data[0].user_id; //esse id viria do banco de dados
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300 // expires in 5min
    });
    return res.json({ auth: true, token: token });
  }

  res.status(500).json({ message: 'Login inválido!' });
})

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns autenticação JWT
 */
function verifyJWT(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    console.log(err)

    if (err) return res.sendStatus(403)

    //req.user = user
    req.userId = decoded.id;
    next()
  })
}

module.exports = router;
