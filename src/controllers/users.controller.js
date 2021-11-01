/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const db = require('../config/database');

const saltRounds = 5;
// ==> Método responsável por listar todos os 'Usuários':
exports.listAllUsers = async (req, res) => {
  const response = await db.query('SELECT nm_user, created_at, email, last_access, user_id, username FROM users.tbl_users');
  // teste = response.rows;
  res.status(200).json(
    {
      data: response.rows,
      success: true,
      rowCount: response.rowCount,
    },
  );
};

// ==> Método responsável por buscar um usuário no banco de dados
exports.searchUser = async (req, res) => {
  const response = await db.query(`SELECT nm_user, created_at, email, last_access, password, user_id, username FROM users.tbl_users where username = '${req.user}'`);
  if (response.rowCount > 0) {
  // Verifica se a hash do password do banco de dados combina com a senha passada
    const passwordCheck = bcrypt.compareSync(req.password, response.rows[0].password); // true
    // remove o campo password
    delete response.rows[0].password;

    if (passwordCheck) {
      return { data: response.rows, success: true, rowCount: response.rowCount };
    }
  }

  return { data: null, success: false, rowCount: 0 };
};

// ==> Método que registra o usuário no banco de dados
exports.registerUser = async (req, res) => {
  // Gera a hash da senha para cadastrar no banco de dados
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.password, salt);

  try {
    // Grava o usuário no banco de dados
    const response = await db.query(`INSERT INTO users.tbl_users(nm_user, username, password, email, created_at, last_access)VALUES ('${req.nmuser}','${req.username}', '${hash}', '${req.email}', now(), now());`);
    return {
      data: response.rows, success: true, rowCount: response.rowCount, message: 'Usuário cadastrado com sucesso!',
    };
  } catch (error) {
    console.log(error);
    return {
      data: error.detail, success: false, rowCount: 0, message: 'Usuário não cadastrado!',
    };
  }
};

// ==> Método que atualiza a data do último acesso do usuário
exports.updateLastAccessUser = async (idUser) => {

  try {
    // Atualiza o horário do último acesso do usuário
    const response = await db.query(`UPDATE users.tbl_users set last_access = now() where user_id = ${idUser};`);
    return {
      data: response.rows, success: true, rowCount: 1, message: 'Atualizado último acesso do usuário!',
    };
  } catch (error) {
    console.log(error);
    return {
      data: error.detail, success: false, rowCount: 0, message: 'Não foi possível alterar o último acesso!',
    };
  }
};
