/*
Input: tripObject
Output: undefined; saves tripObject to data.json file sorted by date oldest to newest
 */

const fs = require('fs');

async function saveToJSON(tripObject) {
  const userJSON = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
  const userData = JSON.parse(userJSON);

  for (let element in tripObject) {
    userData.push(tripObject[element]);
  }
  // sort trips oldest to newest
  userData.sort((a, b) => new Date(a.begin) - new Date(b.begin));

  const toSave = JSON.stringify(userData);
  fs.writeFileSync(`${__dirname}/data/data.json`, toSave, 'utf-8');
}

module.exports = saveToJSON;
