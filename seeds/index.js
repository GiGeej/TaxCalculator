const sequelize = require('../config/connection');
const {User, Taxpayer} = require('../models');
const userData = require('./userData.json');
const taxData = require('./taxData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Taxpayer.bulkCreate(taxData, {
        individualHooks: true,
        returning: true
    });

    process.exit(0);
};

seedDatabase();