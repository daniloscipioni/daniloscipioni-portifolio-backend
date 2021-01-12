/**
 * Arquivo: server.js
 * Descrição: arquivo responsável por toda a configuração e execução da aplicação.
 * Data: 02/03/2020
 * Author: Glaucia Lemos
 */

const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Aplicação executando na porta ', port);
});

// const http = require("http");
// const express = require("express");
// const app = express();

// const { Client } = require('pg');

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   //postgres://fwudoqtnyrslhf:d6eb4b8bad89212d4cb05e6ddb31cd8c1260b5e57fc650b79710eec042d4c100@ec2-18-232-254-253.compute-1.amazonaws.com:5432/d8pfiaj8njdsuv
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// client.connect();

// client.query('SELECT * FROM easyagro.tbl_categories;', (err, res) => {
//   //if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   client.end();
// });



// app.get("/", function(req, res) {
//     res.json({a:'b'});
// });


// http.createServer(app).listen(process.env.PORT || 3000, () => console.log("Servidor rodando local na porta 3000"));