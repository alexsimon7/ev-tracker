/*
Input: Date Obj (date of current kml file to be converted to JSON)
Output: returns the parsed JSON and creates a JSON file in the date folder
 */

const tj = require('@tmcw/togeojson');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { DOMParser } = require('xmldom');
const createDateString = require('./createDateString');

async function kmlToJSON(date) {
  const fileDate = await createDateString(date);

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
  fs.copyFileSync(docPath, `${__dirname}/../../../data/${fileDate}.kml`);

  // Convert to JSON
  const kml = new DOMParser().parseFromString(fs.readFileSync(docPath, 'utf8'));
  const converted = tj.kml(kml);

  // Save JSON to Data File
  fs.writeFileSync(`${__dirname}/../../../data/${fileDate}.json`, JSON.stringify(converted));
  return JSON.parse(JSON.stringify(converted));
}

module.exports = kmlToJSON;
