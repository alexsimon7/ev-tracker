/*
Input: tripObject
Output: undefined; presents trip information in table
 */

const colors = require('colors');
const Table = require('cli-table3');

async function logDay(tripObject) {
  let table = new Table({
    head : ['Date', 'Start', 'Destination', 'Time (Hours)', 'Distance (Miles)', 'Avg Speed (MPH)', 'Battery Used (%)', 'Temp (F)', 'Miles Per Battery %', 'Climate Control'],
    style: {
      head: [],
      border: [],
    },
    colWidths: [10, 15, 15, 11, 11, 11, 11, 11, 11, 11],
    wordWrap: true,
  });

  for (let index = 0; index < tripObject.length; index += 1) {
    const date = new Date(tripObject[index].begin).toDateString();
    const startAddress = Object.hasOwnProperty.call(tripObject[index], 'startAddress') ? tripObject[index].startAddress : 'Unknown';
    const endAddress = Object.hasOwnProperty.call(tripObject[index], 'endAddress') ? tripObject[index].endAddress : 'Unknown';
    const timeInRoute = `${Math.round(tripObject[index].timeInRouteHours * 100) / 100}`;
    const distanceTraveled = `${tripObject[index].distanceInMiles}`;
    const averageSpeed = `${tripObject[index].averageMilesPerHour}`;
    const batteryPercentageUsed = `${tripObject[index].batteryPercentageUsed}`;
    const routeTemp = `${tripObject[index].routeTemp}`;
    const milePerBatteryPercentage = `${Math.round(tripObject[index].milePerBatteryPercentage * 1000) / 1000}`;
    const climateControlUsed = (tripObject[index].usedCC ? 'Yes' : 'No');

    table.push([
      date,
      startAddress,
      endAddress,
      timeInRoute,
      distanceTraveled,
      averageSpeed,
      batteryPercentageUsed,
      (routeTemp <= 32 ? colors.cyan(routeTemp): (routeTemp >= 85 ? colors.red(routeTemp) : colors.yellow(routeTemp))),
      (milePerBatteryPercentage >= 2 ? colors.green(milePerBatteryPercentage): colors.red(milePerBatteryPercentage)),
      climateControlUsed
    ]);
  }
  console.log(table.toString());
}

module.exports = logDay;
