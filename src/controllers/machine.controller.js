const db = require("../config/database");

// ==> Método responsável por listar todos os 'Products':
exports.listAllMachines = async (req, res) => {
    const response = await db.query('SELECT * FROM easyagro.tbl_machines');
    res.status(200).send(response.rows);
  };