// @ts-nocheck
/**
 * Arquivo: src/routes/users.routes.js
 * Descrição: arquivo responsável pelas rotas da api relacionado a classe 'users'.
 * Data: 10/07/2021
 * Author Danilo Scipioni
 */

const router = require('express-promise-router')();
const jwt = require('../config/jwt');
const usersController = require('../controllers/users.controller');

/**
 * POST /api/login
 * @summary Returns a token.
 * @description Optional extended description in CommonMark or HTML.
 * @tag Users
 * @response 200 - A JSON array of authentication values
 * @bodyContent {Login} application/json
 * @responseContent {string[]} 200.application/json
 * @schema users
 */
// eslint-disable-next-line consistent-return
router.post('/login', async (req, res) => {
  const user = await usersController.searchUser(req.body);
  if (user.rowCount > 0) {
    const id = user.data.user_id;
    const validation = jwt.jwtSignin(id);

    return res.json({
      data: {
        authentication: {
          auth: true,
          token: validation.token,
          expiresIn: `${validation.expiresIn}sec`,
        },
        user,
      },
    });
  }

  res.status(401).json({
    data: {
      authentication: {
        auth: false,
        message: 'Login incorreto',
      },
    },

  });
});

/**
 * POST /api/register
 * @sumary Register user
 * @description Register user on database
 * @tag Users
 * @response 200 - A JSON array with register information
 * @bodyContent {Register} application/json
 * @responseContent {string[]} 200.application/json
 * @schema users
 */
router.post('/register', async (req, res) => {
  const register = await usersController.registerUser(req.body);

  if (register.rowCount > 0) {
    res.status(201).json({
      data: {
        success: true,
        message: register.message,

      },

    });
  } else {
    res.status(406).json({
      data: {
        success: false,
        message: `${register.message} -> ${register.data}`,
      },

    });
  }
});

/**
 * GET /api/users
 * @summary Returns a list of users.
 * @description Optional extended description in CommonMark or HTML.
 * @tag Users
 * @security bearerAuth
 * @response 200 - A JSON array of user names
 * @responseContent {string[]} 200.application/json
 */
router.get('/users', jwt.verifyJWT, usersController.listAllUsers);

/**
 * PUT /api/update/last-access
 * @summary Update user last access.
 * @description Optional extended description in CommonMark or HTML.
 * @tag Users
 * @security bearerAuth
 * @response 200 - A JSON array of user names
 * @queryParam {integer} [selectedUser] - id user
 * @responseContent {string[]} 200.application/json
 * @schema users
 */
router.put('/update/last-access', async (req, res) => {
  const update = await usersController.updateLastAccessUser(req.query.selectedUser);

  if (update.rowCount > 0) {
    res.status(201).json({
      data: {
        success: true,
        message: update.message,

      },

    });
  } else {
    res.status(406).json({
      data: {
        success: false,
        message: `${update.message} -> ${update.data}`,
      },

    });
  }
});

module.exports = router;
