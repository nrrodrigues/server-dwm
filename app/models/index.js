const Sequelize = require("sequelize");
const dbConnectionString = process.env.DATABASE_URL || "postgres://postgres:123@localhost:5432/testdb"
const sequelize = new Sequelize(dbConnectionString, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  native: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

module.exports = db;
