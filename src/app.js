const express = require('express');
const cors = require('cors');
const openapi = require('openapi-comment-parser');

// require("dotenv-safe").config();

const app = express();
const swaggerUi = require('swagger-ui-express');

// ==> Rotas da API:
const index = require('./routes/index');
const usersRoute = require('./routes/users.routes');
const rssRoute = require('./routes/rss.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.use(index);
app.use('/api/', usersRoute);
app.use('/api/', rssRoute);

const spec = openapi();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
module.exports = app;
