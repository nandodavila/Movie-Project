const db = require('../config/connection');
const { List, User } = require('../models');

const movieListData = require('./movieListData.json');
const userData = require('./userData.json');

db.once('open', async () => {
  await List.deleteMany({});

  const Lists = await List.insertMany(movieListData);

  // await User.deleteMany({});

  // const Users = await User.insertMany(userData);

  console.log('Movie & User Lists seeded');
  process.exit(0);
});
