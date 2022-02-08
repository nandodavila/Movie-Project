const db = require('../config/connection');
const { List } = require('../models');

const movieListData = require('./movieListData.json');

db.once('open', async () => {
  await List.deleteMany({});

  const awards = await List.insertMany(movieListData);

  console.log('Movie Lists seeded');
  process.exit(0);
});
