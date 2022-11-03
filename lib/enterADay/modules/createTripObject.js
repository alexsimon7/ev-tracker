/*
Input: Date Obj (date to collect trip routes)
Trip Object (which includes driving segments, or if none, an empty Trip Object)
 */

const fs = require('fs');
const path = require('path');
const colors = require('colors');
const readlineSync = require('readline-sync');
const Table = require('cli-table3');
const createDateString = require('./createDateString');

function convertMetersToMiles(meters) {
  const miles = meters / 1609.344;
  return miles.toFixed(2);
}

function timeElapsed(timeOne, timeTwo) {
  let totalSecondsElapsed = 0;

  totalSecondsElapsed = (((timeTwo.getHours() - timeOne.getHours()) * 60) * 60);

  totalSecondsElapsed -= ((timeOne.getMinutes() - timeTwo.getMinutes()) * 60);

  totalSecondsElapsed -= (timeOne.getSeconds() - timeTwo.getSeconds());

  return totalSecondsElapsed;
}

function convertToHours(seconds) {
  return (seconds / 60) / 60;
}

async function createTripObject(date) {
  // Create Date for File Extension

  const fileDate = await createDateString(date);

  // Read the File and Parse to JSON

  const readFile = fs.readFileSync(`${__dirname}/../../../data/${fileDate}.json`, 'utf8');

  const obj = JSON.parse(readFile);

  // Create New Trip Array, Iterate Through JSON Data Looking For Driving Trips

  const tripObject = [];

  obj.features.forEach((element, index) => {
    const routeSegment = {};

    if (element.geometry.type === 'LineString' && element.properties.Category === 'Driving') {
      routeSegment.begin = new Date(element.properties.timespan.begin);
      routeSegment.end = new Date(element.properties.timespan.end);

      routeSegment.timeInRouteSeconds = timeElapsed(routeSegment.begin, routeSegment.end);
      routeSegment.timeInRouteHours = convertToHours(routeSegment.timeInRouteSeconds);

      routeSegment.distanceInMiles = convertMetersToMiles(Number.parseInt(element.properties.Distance, 10));

      routeSegment.averageMilesPerHour = (routeSegment.distanceInMiles / routeSegment.timeInRouteHours).toFixed(2);

      if (obj.features[index - 1].geometry.type === 'Point' && obj.features[index - 1].properties.timespan.end === routeSegment.begin.toISOString()) {
        routeSegment.startAddressName = obj.features[index - 1].properties.name;
        routeSegment.startAddress = obj.features[index - 1].properties.address;
        routeSegment.startLongLat = obj.features[index - 1].geometry.coordinates;
      }

      if (obj.features[index + 1].geometry.type === 'Point' && obj.features[index + 1].properties.timespan.begin === routeSegment.end.toISOString()) {
        routeSegment.endAddressName = obj.features[index + 1].properties.name;
        routeSegment.endAddress = obj.features[index + 1].properties.address;
        routeSegment.endLongLat = obj.features[index + 1].geometry.coordinates;
      }
    }

    if (Object.hasOwn(routeSegment, 'begin')) {
      // Confirm With User That Driving Trip Should Be Tracked, Add Trip Array If So
      const table = new Table({
        head: ['Start', 'Destination'],
        style: {
          head: [],
          border: [],
        },
        colWidths: [15, 15],
        wordWrap: true,
      });

      table.push([routeSegment.startAddress, routeSegment.endAddress]);
      console.log(table.toString());
      console.log('Include trip? (y/n)');
      let includeTrip = readlineSync.prompt();

      while (includeTrip !== 'y' && includeTrip !== 'n') {
        console.log(colors.red(`Incorrect entry. Include trip from ${routeSegment.startAddress} to ${routeSegment.endAddress}? (y/n)`));
        includeTrip = readlineSync.prompt();
      }

      if (includeTrip === 'y') {
        tripObject.push(routeSegment);
      } else if (includeTrip === 'n') {
        console.log(colors.red(`Trip from ${routeSegment.startAddress} to ${routeSegment.endAddress} not included`));
      }
    }
  });

  return tripObject;
}

module.exports = createTripObject;
