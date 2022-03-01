const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('d60rmorktgrcjn', 'sbtpiwwaoiecvm', '839e35406d09596f3644bc255780f917a2a3ed4a6eed65059b95085967137d47', {
  host: 'ec2-3-227-195-74.compute-1.amazonaws.com',
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});
// try {
//   sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

module.exports = sequelize;