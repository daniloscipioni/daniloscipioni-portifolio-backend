// @ts-nocheck
/**
 * Arquivo: src/routes/machine.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'Machine'.
 * Data: 04/03/2020
 * Author Glaucia Lemos
 */

const router = require('express-promise-router')();
const usersController = require('../controllers/users.controller');

// ==> Definindo as rotas do CRUD - 'Product':

// ==> Rota responsável por criar um novo 'Product': (POST): localhost:3000/api/products
router.get('/users', usersController.listAllUsers);

module.exports = router;

//router.get('/machines', machineController.listAllMachines);