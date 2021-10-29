// @ts-nocheck
/**
 * Arquivo: src/routes/users.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'rss'.
 * Data: 10/07/2021
 * Author Danilo Scipioni
 */

const router = require('express-promise-router')();
const rssController = require('../controllers/rss.controller');

/**
 * GET /api/rss
 * @summary Return rss for news
 * @description News via rss
 * @response 200 - A JSON array of rss values
 * @tag Rss
 * @bodyContent {Rss} application/json
 * @responseContent {string[]} 200.application/json
 */
router.get('/rss', async (req, res) => {
  const valorRss = await rssController.rss('http://pox.globo.com/rss/valor');
  const wiredRss = await rssController.rss('https://www.wired.com/feed/rss');
  const g1Rss = await rssController.rss('https://g1.globo.com/rss/g1/');
  const theguardianRss = await rssController.rss('https://www.theguardian.com/world/brazil/rss');

  let finalRss = [];
  finalRss = {
    valor: valorRss,
    wired: wiredRss,
    g1: g1Rss,
    theguardian: theguardianRss,
  };

  const counter = finalRss.valor.length + finalRss.wired.length + finalRss.g1.length + finalRss.theguardian.length;
  res.status(200).json(
    {
      data: finalRss,
      success: true,
      rowCount: counter,
    },
  );
});

module.exports = router;
