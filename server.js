const http = require("http");
const express = require("express");
const app = express();

app.get("/", function(req, res) {
    res.json({
        1:"Máquina 1",
        2:"Máquina 2",
        3:"Máquina 3",
        4:"Máquina 4",
        5:"Máquina 5",
        6:"Máquina 6",
        7:"Máquina 7"
    });
});


http.createServer(app).listen(process.env.PORT || 3000, () => console.log("Servidor rodando local na porta 3000"));