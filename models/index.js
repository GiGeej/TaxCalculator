const User = require('./user');
const Pay = require('./Pay');
const Taxpayer = require('./taxpayers');

Taxpayer.belongsTo(User, { 
    foreignKey: "user_id" 
});

User.hasMany(Taxpayer, {
    foreignKey: "user_id",
    onDelete: "CASCASE"
})

module.exports = { User, Taxpayer, Pay };