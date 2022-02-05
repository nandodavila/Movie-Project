const db = require('../config/connection');
const { Award } = require('../models');

const awardListData = require('./awardListData.json');

db.once('open', async () => {
  await Award.deleteMany({});

  const awards = await Award.insertMany(awardListData);

  console.log('Award List seeded');
  process.exit(0);
});
