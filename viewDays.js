/*
input: None
output: undefined, logs all trips in data.json


TODO:
  - Error Handling

 */

const fs = require('fs');

const logDay = require('./logDay');

async function viewDays() {
  const data = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`, 'utf8'));
  await logDay(data);

}

module.exports = viewDays;