/*
Input: none
Output: undefined; grabs kml file, converts to JSON, creates a newEventObject,
  add data and saves newEventObject, depending on user input
** return statements used to stop execution for errors downloading kml, converting to JSON, or
accessing weather API
 */

const readlineSync = require('readline-sync');

const os = require('os');
const path = require('path');
const colors = require('colors');
const timelineGrabber = require('./modules/timelineGrabber');
const kmlToJSON = require('./modules/kmlToJSON');
const createTripObject = require('./modules/createTripObject');
const addWeatherToRoutes = require('./modules/addWeatherToRoutes');
const enterBatteryInfo = require('./modules/enterBatteryInfo');
const logDay = require('../common/logDay');
const saveToJSON = require('./modules/saveToJSON');
const checkFolderForFile = require('./modules/checkFolderForFile');

function correctFormatOfDate(date) {
  return Date.parse(date);
}

async function enterADay() {
  let newDate = '';

  console.log('Enter a Date (mm/dd/yyyy): ');
  newDate = readlineSync.prompt();

  while (!(correctFormatOfDate(newDate))) {
    console.log(colors.red('Incorrect Date Format. Enter a Date (mm/dd/yyyy): '));
    newDate = readlineSync.prompt();
  }

  const newDateObject = new Date(newDate);
  const alreadyDownloaded = await checkFolderForFile(newDateObject, `${os.homedir()}/Downloads`, '.kml');
  const alreadyHaveJSON = await checkFolderForFile(newDateObject, `${__dirname}/../../data/`, '.json');

  if (!alreadyHaveJSON) {
    if (!alreadyDownloaded) {
      try {
        await timelineGrabber(newDateObject);
      } catch (e) {
        console.log(colors.red(`Timeline Grabber Failed: ${e.message.toString()}`));
        return;
      }
      console.log(colors.green('Timeline Grabbed Successfully.'));

      try {
        await kmlToJSON(newDateObject);
      } catch (e) {
        console.log(colors.red(`KML to JSON Conversion Failed: ${e.message.toString()}`));
        return;
      }
      console.log(colors.green('Converted to JSON.'));
    } else {
      console.log('KML already downloaded.');
      try {
        await kmlToJSON(newDateObject);
      } catch (e) {
        console.log(colors.red(`KML to JSON Conversion Failed: ${e.message.toString()}`));
        return;
      }
      console.log(colors.green('Converted to JSON.'));
    }
  } else {
    console.log('JSON already in data.');
  }

  const newEventObject = await createTripObject(newDateObject);

  if (newEventObject.length === 0) {
    console.log('No Trips Selected.');
  } else {
    try {
      await addWeatherToRoutes(newEventObject);
    } catch (e) {
      console.log(colors.red(`Failed to Access Weather API: ${e.message.toString()}`));
      return;
    }
    console.log(colors.green('Weather Added.'));

    await enterBatteryInfo(newEventObject);
    await logDay(newEventObject);

    console.log("Save the above day's trips? (y/n)");
    let saveQuestion = readlineSync.prompt();

    while (saveQuestion !== 'y' && saveQuestion !== 'n') {
      console.log(colors.red("Incorrect entry. Save the above day's trips? (y/n)"));
      saveQuestion = readlineSync.prompt();
    }

    if (saveQuestion === 'y') {
      await saveToJSON(newEventObject);
      console.log(colors.green("Day's Trips Saved."));
    } else {
      console.log(colors.red("Day's Trips NOT Saved."));
    }
  }
}

module.exports = enterADay;
