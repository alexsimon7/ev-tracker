async function logDay(newEventObject) {
  for (let index = 0; index < newEventObject.length; index += 1) {
    const startAddress = Object.hasOwnProperty.call(newEventObject[index], 'startAddress') ? newEventObject[index].startAddress : 'Unknown';
    const endAddress = Object.hasOwnProperty.call(newEventObject[index], 'endAddress') ? newEventObject[index].endAddress : 'Unknown';
    const timeInRoute = `${newEventObject[index].timeInRouteHours} hours`;
    const distanceTraveled = `${newEventObject[index].distanceInMiles} miles`;
    const averageSpeed = `${newEventObject[index].averageMilesPerHour} avg miles per hour`;
    const batteryPercentageUsed = `${newEventObject[index].batteryPercentageUsed}% battery used`;
    const routeTemp = `${newEventObject[index].routeTemp} degrees F`;
    const milePerBatteryPercentage = `${newEventObject[index].milePerBatteryPercentage} mile per battery %`;
    const climateControlUsed = (newEventObject[index].usedCC ? 'Yes' : 'No');

    console.log('-----------------------------------------------------------');
    console.log(`Start Address: ${startAddress}\nEnd Address: ${endAddress}\nTime in Route: ${timeInRoute}\nDistance Traveled: ${distanceTraveled}\nAverage Speed: ${averageSpeed}\nBattery Percentage Used: ${batteryPercentageUsed}\nTemperature: ${routeTemp}\nBattery Percentage Per Mile: ${milePerBatteryPercentage}\nClimate Control Used: ${climateControlUsed}`);
  }

  console.log('-----------------------------------------------------------');
}

module.exports = logDay;
