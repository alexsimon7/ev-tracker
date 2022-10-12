const readlineSync = require('readline-sync');

const timelineGrabber = require('./timelineGrabber/timelineGrabber');
const kmlToJSON = require('./kmlToJSON');
const createTripObject = require('./createTripObject');
const addWeatherToRoutes = require('./addWeatherToRoutes');

function correctFormatOfDate(date) {
  return Date.parse(date);
}


async function enterADay() {
  let newDate = '';

  console.log('Enter a Date (mm/dd/yyyy): \n');
  newDate = readlineSync.prompt();

  while (!(correctFormatOfDate(newDate))) {
    console.log('Incorrect Date Format.');
    console.log('Enter a Date (mm/dd/yyyy): \n');
    newDate = readlineSync.prompt();
  }

  let newDateObject = new Date(newDate);

  //potential functionality to prevent previous dates (search of the database)

  // await timelineGrabber(newDateObject);
  // console.log('Timeline Grabbed.')

  await kmlToJSON(newDateObject);
  console.log('Converted to JSON');

  let newEventObject = await createTripObject(newDateObject);
  console.log('New Object Created');

  //add weather via API

  await addWeatherToRoutes(newEventObject);
  console.log('Weather Added.');
  console.log(newEventObject);


  //ask battery questions
    //iterating through the data adding battery percentages at beginning and ending of segements
    //ask about heat or acc


  // present the final object in readable manner, confirm that data is correct


  // save final object to file (database?)

  console.log('Process Done.')

}

module.exports = enterADay;