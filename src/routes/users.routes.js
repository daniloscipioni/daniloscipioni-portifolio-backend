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
// ==> Definindo as rotas do CRUD - 'Product':

// ==> Rota responsável por criar um novo 'Product': (POST): localhost:3000/api/products
//router.get('/users', usersController.listAllUsers);

router.get('/users', verifyJWT, usersController.listAllUsers)

// router.get('/users', verifyJWT, (req, res, next) => { 
//   console.log("Retornou todos clientes!");
//   //res.json(usersController.listAllUsers);
//   res.json([{id:1,nome:'luiz'}]);
// })


router.post('/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'danilo' && req.body.password === 'danilo89'){
      //auth ok
       const id = 1; //esse id viria do banco de dados
       const token = jwt.sign({ id }, process.env.SECRET, {
         expiresIn: 300 // expires in 5min
       });
      return res.json({ auth: true, token: token });
}
    
    res.status(500).json({message: 'Login inválido!'});
})

function verifyJWT(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    console.log(err)

    if (err) return res.sendStatus(403)

    //req.user = user
    req.userId = decoded.id;
    next()
  })
}

module.exports = router;
