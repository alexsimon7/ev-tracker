const fs = require('fs');
const filterData = require('./filterData');
const logDay = require('./logDay');

async function viewDays() {
  let data = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`, 'utf8'));
  data = await filterData(data);
  await logDay(data);
}

// async function viewDays() {
//   const data = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`, 'utf8'));
//   await logDay(data);
// }

module.exports = viewDays;
