const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('portal', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql',
});

try {
    sequelize.authenticate();
    console.log("Connction has been established");

} catch (error) {
    console.log("unabled to connect", error);
}

module.exports = sequelize;