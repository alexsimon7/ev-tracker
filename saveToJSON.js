const fs = require('fs');

// Add Error Handling

async function saveToJSON(newEventObject) {
  let toSave = JSON.stringify(newEventObject);
  fs.writeFileSync(`${__dirname}/data/data.json`, toSave);
}

module.exports = saveToJSON;