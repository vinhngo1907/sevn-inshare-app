const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('file_upload', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    // storage: './database/sequelize.db'
    // logging: true
});

sequelize.authenticate()
    .then(() => console.log("DB connected"))
    .catch(error => console.log(error));

const db = {}

db.sequelize = sequelize;

db.File = require("../models/File")(sequelize, DataTypes);

module.exports = db;