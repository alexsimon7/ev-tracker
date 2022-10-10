const tj = require('@tmcw/togeojson');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { DOMParser } = require('xmldom');

/*
Input: Date Obj (date of current kml file to be converted to JSON)
Output: returns the parsed JSON and creates a JSON file in the date
folder **Do we need to create the JSON file?
 */

function kmlToJSON(date) {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().length === 1 ? `0${(date.getMonth() + 1).toString()}` : (date.getMonth() + 1).toString();
  const day = date.getDate().toString().length === 1 ? `0${date.getDate().toString()}` : date.getDate().toString();
  const fileDate = `${year}-${month}-${day}`;

  // Get Filename for Downloaded Document
  const fileDir = fs.readdirSync(`${os.homedir()}/Downloads`, 'utf8');
  let fileName = '';

  fileDir.forEach((element) => {
    if (element.includes(fileDate) && element.includes('.kml')) {
      fileName = element;
    }
  });

  // Build Path to File
  const docPath = path.join(`${os.homedir()}/Downloads`, fileName);

  // Copy KML File to Data File
  fs.copyFileSync(docPath, `/${path.dirname(__dirname)}/data/${fileDate}.kml`);

  // Convert to JSON
  const kml = new DOMParser().parseFromString(fs.readFileSync(docPath, 'utf8'));
  const converted = tj.kml(kml);

  // Save JSON to Data File
  fs.writeFileSync(`${path.dirname(__dirname)}/data/${fileDate}.json`, JSON.stringify(converted));
  return JSON.parse(JSON.stringify(converted));
}

module.exports = kmlToJSON;
