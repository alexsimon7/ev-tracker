/*
Input: tripObject
Output: undefined; saves tripObject to data.json file

TODO:
  - Error Handling re write to data.json file
 */

const fs = require('fs');

async function saveToJSON(tripObject) {
  let toSave = JSON.stringify(tripObject);
  fs.writeFileSync(`${__dirname}/data/data.json`, toSave);
}

module.exports = saveToJSON;