/*
Input: tripObject
Output: undefined; logs selected trip data
 */

async function logDay(tripObject) {
  for (let index = 0; index < tripObject.length; index += 1) {
    const date = new Date(tripObject[index].begin).toDateString();
    const startAddress = Object.hasOwnProperty.call(tripObject[index], 'startAddress') ? tripObject[index].startAddress : 'Unknown';
    const endAddress = Object.hasOwnProperty.call(tripObject[index], 'endAddress') ? tripObject[index].endAddress : 'Unknown';
    const timeInRoute = `${tripObject[index].timeInRouteHours} hours`;
    const distanceTraveled = `${tripObject[index].distanceInMiles} miles`;
    const averageSpeed = `${tripObject[index].averageMilesPerHour} avg miles per hour`;
    const batteryPercentageUsed = `${tripObject[index].batteryPercentageUsed}% battery used`;
    const routeTemp = `${tripObject[index].routeTemp} degrees F`;
    const milePerBatteryPercentage = `${tripObject[index].milePerBatteryPercentage} mile per battery %`;
    const climateControlUsed = (tripObject[index].usedCC ? 'Yes' : 'No');

    console.log('-----------------------------------------------------------');
    console.log(`Trip Date: ${date}\nStart Address: ${startAddress}\nEnd Address: ${endAddress}\nTime in Route: ${timeInRoute}\nDistance Traveled: ${distanceTraveled}\nAverage Speed: ${averageSpeed}\nBattery Percentage Used: ${batteryPercentageUsed}\nTemperature: ${routeTemp}\nBattery Percentage Per Mile: ${milePerBatteryPercentage}\nClimate Control Used: ${climateControlUsed}`);
  }

  console.log('-----------------------------------------------------------');
}

module.exports = logDay;
