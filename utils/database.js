const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "localhost", {
  dialect: "mysql2",
  host: "localhost",
});

module.exports = sequelize;
