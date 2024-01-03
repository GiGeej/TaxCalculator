const User = require('./user');
const Pay = require('./Pay');
const Taxpayer = require('./taxpayers');

Taxpayer.belongsTo(User, { 
    foreignKey: "user_id" 
});

// Taxpayer.hasMany(Pay, {
//     foreignKey: "pay_id",
//     onDelete: "CASCADE"
// })

User.hasMany(Taxpayer, {
    foreignKey: "user_id",
    onDelete: "CASCASE"
})

module.exports = { User, Taxpayer, Pay };