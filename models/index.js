const User = require('./user');
const Taxpayer = require('./taxpayers');
const Wages = require('./wages');
const Salary = require('./salary');

Taxpayer.belongsTo(User, { 
    foreignKey: "user_id" 
});
