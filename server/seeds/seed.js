const db = require('../config/connection');
const { List, User } = require('../models');

const awardListData = require('./awardListData.json');
const movieListData = require('./movieListData.json');

db.once('open', async () => {
  await List.deleteMany({});

  const Lists = await List.insertMany(movieListData);

  console.log('Award List seeded');
  process.exit(0);
});
