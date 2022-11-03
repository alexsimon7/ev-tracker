/*
Input: None
Output: None. Logs data via logDay
 */
const fs = require('fs');
const filterData = require('./modules/filterData');
const logDay = require('../common/logDay');

async function viewDays() {
  let data = JSON.parse(fs.readFileSync(`${__dirname}/../../data/data.json`, 'utf8'));
  data = await filterData(data);
  await logDay(data);
}

module.exports = viewDays;
