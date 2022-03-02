const { DataTypes } = require('sequelize');

// const sequelize = new Sequelize('postgres::memory:');
const sequelize = require('../config/database-sequelize');

const User = sequelize.define('User', {
  // Model attributes are defined here
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nm_user: {
    type: DataTypes.STRING(100),
  },
  email: {
    type: DataTypes.STRING(100),
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
  last_access: {
    type: DataTypes.DATE,
    defaultValue: Date.now(),
  },
  username: {
    type: DataTypes.STRING(50),
  },
  password: {
    type: DataTypes.STRING(100),
  },

}, {
  // Other model options go here
  tableName: 'tbl_users',
  schema: 'users',
  createdAt: false,
  updatedAt: false,
});

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User;
