/*
TODO:
-
 */

// Input: newEventObj
// Output: undefined; adds appropriate weather to each element
// let exampleURL = "https://archive-api.open-meteo.com/v1/era5?latitude=52.52&longitude=13.41&start_date=2022-01-01&end_date=2022-01-01&hourly=temperature_2m&temperature_unit=fahrenheit";

const fetch = require('node-fetch');

async function addWeatherToRoutes(tripObject) {
  // iterate over trip object (an array of objects)

  for (const element in tripObject) {
    // create the url for the route
    let latitude;
    let longitude;

    // if there is a start LongLat, use it

    if (Object.hasOwn(tripObject[element], 'startLongLat')) {
      latitude = tripObject[element].startLongLat[1];
      longitude = tripObject[element].startLongLat[0];
    } else if (Object.hasOwn(tripObject[element], 'endLongLat')) {
      latitude = tripObject[element].endLongLat[1];
      longitude = tripObject[element].endLongLat[0];
    } else {
      tripObject[element].routeTemp = null;
    }

    const year = tripObject[element].begin.getFullYear().toString();
    const month = (tripObject[element].begin.getMonth() + 1).toString().length === 1 ? '0' + (tripObject[element].begin.getMonth() + 1).toString() : (tripObject[element].begin.getMonth() + 1).toString();
    const day = tripObject[element].begin.getDate().toString().length === 1 ? '0' + tripObject[element].begin.getDate().toString() : tripObject[element].begin.getDate().toString();
    const tripDate = `${year}-${month}-${day}`;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${tripDate}&end_date=${tripDate}&hourly=temperature_2m&temperature_unit=fahrenheit&timezone=auto`;

    const response = await fetch(url).catch((err) => console.log(err));
    const data = await response.json();

    const beginHour = tripObject[element].begin.getHours();

    tripObject[element].routeTemp = data.hourly.temperature_2m[beginHour];
  }
}

module.exports = addWeatherToRoutes;
