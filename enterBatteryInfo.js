/*
Input: Trip Object
Output: Trip Object modified with battery related info and climate control info

TODO:
  - Error Handling?
 */
const readlineSync = require('readline-sync');

function incorrectBatteryPercentage(batteryPercentage) {
  return Number.isNaN(batteryPercentage) || batteryPercentage < 0 || batteryPercentage > 100;
}

async function enterBatteryInfo(tripObject) {
  for (let index = 0; index < tripObject.length; index += 1) {
    const startAddress = Object.hasOwnProperty.call(tripObject[index], 'startAddress') ? tripObject[index].startAddress : 'Unknown';
    const endAddress = Object.hasOwnProperty.call(tripObject[index], 'endAddress') ? tripObject[index].endAddress : 'Unknown';

    console.log(`Route:\nStart: ${startAddress}\nEnd: ${endAddress}`);
    let startBattery = -2;
    let endBattery = -1;

    while (endBattery > startBattery) {
      if (startBattery !== -2 && endBattery !== -1) {
        console.log('Invalid start and end battery percentages.\nEnd battery was greater than start battery.\nEnter percentages again.');
      }

      console.log('Enter the starting battery percentage: ');
      startBattery = Number.parseInt(readlineSync.prompt());

      while (incorrectBatteryPercentage(Number.parseInt(startBattery))) {
        console.log('Incorrect entry. Enter the starting battery percentage: ');
        startBattery = Number.parseInt(readlineSync.prompt());
      }

      console.log('Enter the ending battery percentage: ');
      endBattery = Number.parseInt(readlineSync.prompt());

      while (incorrectBatteryPercentage(Number.parseInt(endBattery))) {
        console.log('Incorrect entry. Enter the starting battery percentage: ');
        endBattery = Number.parseInt(readlineSync.prompt());
      }
    }

    console.log('Did you use the climate control? (y/n)');
    let usedCC = readlineSync.prompt();

    while (usedCC !== 'y' && usedCC !== 'n') {
      console.log('Incorrect entry. Did you use the climate control? (y/n)');
      usedCC = readlineSync.prompt();
    }

    tripObject[index].startBattery = Number.parseInt(startBattery);
    tripObject[index].endBattery = Number.parseInt(endBattery);
    tripObject[index].batteryPercentageUsed = Number.parseInt(startBattery) - Number.parseInt(endBattery);
    tripObject[index].usedCC = usedCC === 'y';
    tripObject[index].milePerBatteryPercentage = tripObject[index].distanceInMiles / tripObject[index].batteryPercentageUsed;
  }
}

module.exports = enterBatteryInfo;
