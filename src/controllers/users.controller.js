const db = require("../config/database");

// ==> Método responsável por listar todos os 'Products':
exports.listAllUsers = async (req, res) => {

  const response = await db.query('SELECT * FROM users.tbl_users');
  //teste = response.rows;
  res.status(200).json(
    {
      'data': response.rows,
      'success': true,
      'rowCount': response.rowCount
    });

};

// ==> Método responsável por listar todos os 'Products':
exports.searchUser = async (req, res) => {

  const response = await db.query(`SELECT * FROM users.tbl_users where username = '${req.user}' and password = '${req.password}'`);


  return { data: response.rows, success: true, rowCount: response.rowCount };



};

