const db = require("../config/database");

// ==> Método responsável por listar todos os 'Products':
exports.listAllHistoric = async (req, res) => {
   
    const response = await db.query('SELECT * FROM easyagro.tbl_historico_maquina');

    //teste = response.rows;
    res.status(200).json(
      {
        'data':response.rows,
        'success':true,
        'rowCount':response.rowCount
    });

  };