const User = require('./user');
const Taxpayer = require('./taxpayers');
const Wages = require('./wages');
const Salary = require('./salary');

Taxpayer.belongsTo(User, { 
    foreignKey: "user_id" 
});

User.hasMany(Taxpayer, {
    foreignKey: "user_id",
    onDelete: "CASCASE"
})

module.exports = { User, Taxpayer };