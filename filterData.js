const readlineSync = require('readline-sync');
const colors = require('colors');

async function filterData(data) {
  let dataToFilter = data;
  let choiceFilter = '0';
  const validChoices = ['1', '2', '3', '4', '5', '6'];
  const filtersChosen = [];

  while (choiceFilter !== '6') {
    console.log('Filter Choices: ');
    console.log((filtersChosen.includes('1')) ? colors.green('1. Temp >= 85 F') : '1. Temp >= 85 F');
    console.log((filtersChosen.includes('2')) ? colors.green('2. Temps <= 32 F') : '2. Temps <= 32 F');
    console.log((filtersChosen.includes('3')) ? colors.green('3. Miles Per Battery % < 2') : '3. Miles Per Battery % < 2');
    console.log((filtersChosen.includes('4')) ? colors.green('4. Miles Per Battery % >= 2') : '4. Miles Per Battery % >= 2');
    console.log((filtersChosen.includes('5')) ? colors.green('5. Climate Control Used') : '5. Climate Control Used');
    console.log('6. Display Data');

    choiceFilter = readlineSync.prompt();

    while (!(validChoices.includes(choiceFilter))) {
      console.log('Invalid entry.');
      console.log('Filter Choices: ');
      console.log((filtersChosen.includes('1')) ? colors.green('1. Temp >= 85 F') : '1. Temp >= 85 F');
      console.log((filtersChosen.includes('2')) ? colors.green('2. Temps <= 32 F') : '2. Temps <= 32 F');
      console.log((filtersChosen.includes('3')) ? colors.green('3. Miles Per Battery % < 2') : '3. Miles Per Battery % < 2');
      console.log((filtersChosen.includes('4')) ? colors.green('4. Miles Per Battery % >= 2') : '4. Miles Per Battery % >= 2');
      console.log((filtersChosen.includes('5')) ? colors.green('5. Climate Control Used') : '5. Climate Control Used');
      console.log('6. DisplayData');
      choiceFilter = readlineSync.prompt();
    }

    if (!(filtersChosen.includes(choiceFilter))) {
      filtersChosen.push(choiceFilter);
    } else {
      filtersChosen.splice(filtersChosen.indexOf(choiceFilter), 1);
    }
  }

  filtersChosen.forEach((element) => {
    switch (element) {
      case '1':
        dataToFilter = dataToFilter.filter((element) => element.routeTemp >= 85);
        break;
      case '2':
        dataToFilter = dataToFilter.filter((element) => element.routeTemp <= 32);
        break;
      case '3':
        dataToFilter = dataToFilter.filter((element) => element.milePerBatteryPercentage < 2);
        break;
      case '4':
        dataToFilter = dataToFilter.filter((element) => element.milePerBatteryPercentage >= 2);
        break;
      case '5':
        dataToFilter = dataToFilter.filter((element) => element.usedCC === true);
        break;
      case '6':
        dataToFilter = dataToFilter.sort((a, b) => new Date(a.begin) - new Date(b.begin));
        break;
    }
  });

  return dataToFilter;
}

module.exports = filterData;
