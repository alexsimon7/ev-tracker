/*
Input: none
Output: undefined; grabs kml file, converts to JSON, creates a newEventObject, add data and saves newEventObject, depending on user input

TODO:
  - Error Handling?
 */

const readlineSync = require('readline-sync');

const timelineGrabber = require('./timelineGrabber/timelineGrabber');
const kmlToJSON = require('./kmlToJSON');
const createTripObject = require('./createTripObject');
const addWeatherToRoutes = require('./addWeatherToRoutes');
const enterBatteryInfo = require('./enterBatteryInfo');
const logDay = require('./logDay');
const saveToJSON = require('./saveToJSON');
const os = require("os");
const path = require("path");
const checkFolderForFile = require("./checkFolderForFile");
const createDateString = require("./createDateString");

function correctFormatOfDate(date) {
  return Date.parse(date);
}

async function enterADay() {
  let newDate = '';

  console.log('Enter a Date (mm/dd/yyyy): ');
  newDate = readlineSync.prompt();

  while (!(correctFormatOfDate(newDate))) {
    console.log('Incorrect Date Format.');
    console.log('Enter a Date (mm/dd/yyyy): ');
    newDate = readlineSync.prompt();
  }

  const newDateObject = new Date(newDate);
  const alreadyDownloaded = await checkFolderForFile(newDateObject, `${os.homedir()}/Downloads`, '.kml');
  const alreadyHaveJSON = await checkFolderForFile(newDateObject, `${path.dirname(__dirname)}/ev-tracker/data/`, '.json');

  if(!alreadyHaveJSON) {
    if(!alreadyDownloaded) {
      await timelineGrabber(newDateObject);
      console.log('Timeline Grabbed.');

      await kmlToJSON(newDateObject);
      console.log('Converted to JSON');

    } else {
      console.log('KML already downloaded.');
      await kmlToJSON(newDateObject);
      console.log('Converted to JSON');
    }
  } else {
    console.log(`JSON already in data`);
  }

  let newEventObject = await createTripObject(newDateObject);
  console.log('New Object Created');

  await addWeatherToRoutes(newEventObject);
  console.log('Weather Added.');

  await enterBatteryInfo(newEventObject);
  console.log('Battery and AC/Heat Added.');

  console.log(newEventObject);
  await logDay(newEventObject);

  console.log("Save the above day's trips? (y/n)");
  let saveQuestion = readlineSync.prompt();

  while (saveQuestion !== 'y' && saveQuestion !== 'n') {
    console.log("Incorrect entry. Save the above day's trips? (y/n)");
    saveQuestion = readlineSync.prompt();
  }

  if (saveQuestion === 'y') {
    await saveToJSON(newEventObject);
    console.log("Day's Trips Saved.");
  } else {
    console.log("Day's Trips NOT Saved.");
  }
  console.log('Process Done.');
}

module.exports = enterADay;
