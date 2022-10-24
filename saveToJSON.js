/*
Input: tripObject
Output: undefined; saves tripObject to data.json file

TODO:
  - Error Handling re write to data.json file
 */

const fs = require('fs');

async function saveToJSON(tripObject) {
  const userJSON = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
  let userData = JSON.parse(userJSON);

  for(let element in tripObject) {
    userData.push(tripObject[element]);
  }

  const toSave = JSON.stringify(userData);
  fs.writeFileSync(`${__dirname}/data/data.json`, toSave, "utf-8");
}

module.exports = saveToJSON;

