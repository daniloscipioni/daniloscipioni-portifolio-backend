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
router.get('/users', usersController.listAllUsers);

router.post('/login', (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'danilo' && req.body.password === 'danilo89'){
      //auth ok
    //   const id = 1; //esse id viria do banco de dados
       const token = jwt.sign({ id }, process.env.SECRET, {
         expiresIn: 300 // expires in 5min
       });
      return res.json({ auth: true, token: token });
    //    res.status(200).json({message: 'Login autorizado!'});
}
    
    res.status(500).json({message: 'Login inválido!'});
})


module.exports = router;

//router.get('/machines', machineController.listAllMachines);