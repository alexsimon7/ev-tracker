/*
Input: Event Objects
Output: Event Object with Battery %s added
 */

const readlineSync = require('readline-sync');

function incorrectBatteryPercentage(batteryPercentage) {
  return Number.isNaN(batteryPercentage) || batteryPercentage < 0 || batteryPercentage > 100;
}

async function enterBatteryInfo(newEventObject) {
  for (let index = 0; index < newEventObject.length; index += 1) {
    const startAddress = Object.hasOwnProperty.call(newEventObject[index], 'startAddress') ? newEventObject[index].startAddress : 'Unknown';
    const endAddress = Object.hasOwnProperty.call(newEventObject[index], 'endAddress') ? newEventObject[index].endAddress : 'Unknown';

    console.log(`Route:\nStart: ${startAddress}\nEnd: ${endAddress}`);
    let startBattery = -2;
    let endBattery = -1;

    while (endBattery > startBattery) {
      if (startBattery !== -2 && endBattery !== -1) {
        console.log('Invalid start and end battery percentages.\nEnd battery was greater than start battery.\nEnter percentages again.');
      }

      console.log('Enter the starting battery percentage: ');
      startBattery = readlineSync.prompt();

      while (incorrectBatteryPercentage(Number.parseInt(startBattery))) {
        console.log('Incorrect entry. Enter the starting battery percentage: ');
        startBattery = readlineSync.prompt();
      }

      console.log('Enter the ending battery percentage: ');
      endBattery = readlineSync.prompt();

      while (incorrectBatteryPercentage(Number.parseInt(endBattery))) {
        console.log('Incorrect entry. Enter the starting battery percentage: ');
        endBattery = readlineSync.prompt();
      }
    }

    console.log('Did you use the climate control? (y/n)');
    let usedCC = readlineSync.prompt();

    while (usedCC !== 'y' && usedCC !== 'n') {
      console.log('Incorrect entry. Did you use the climate control? (y/n)');
      usedCC = readlineSync.prompt();
    }

    newEventObject[index].startBattery = Number.parseInt(startBattery);
    newEventObject[index].endBattery = Number.parseInt(endBattery);
    newEventObject[index].batteryPercentageUsed = Number.parseInt(startBattery) - Number.parseInt(endBattery);
    newEventObject[index].usedCC = usedCC === 'y';
    newEventObject[index].milePerBatteryPercentage = newEventObject[index].distanceInMiles / newEventObject[index].batteryPercentageUsed;
  }
}

module.exports = enterBatteryInfo;
