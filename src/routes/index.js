/**
 * Arquivo: src/routes/index.js
 * Descrição: arquivo responsável pela chamada da Api da aplicação.
 * Data: 28/02/2022
 * Author Danilo Scipioni
 */

const express = require('express');

const router = express.Router();

router.get(['/', '/api'], (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Seja bem-vindo(a) a API Node.js + PostgreSQL + Heroku!',
    version: '1.0.1',
    documentation: '/api-docs/',
  });
});

module.exports = router;
