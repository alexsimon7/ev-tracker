/*
Input: None
Output: Deletes provided trips from given day from JSON
 */
const readlineSync = require('readline-sync');
const fs = require('fs');
const colors = require('colors');

function correctFormatOfDate(date) {
  return Date.parse(date);
}

async function removeADay() {
  console.log('Enter a Date (mm/dd/yyyy): ');
  let deleteDate = readlineSync.prompt();

  while (!(correctFormatOfDate(deleteDate))) {
    console.log(colors.red('Incorrect Date Format. Enter a Date (mm/dd/yyyy): '));
    deleteDate = readlineSync.prompt();
  }

  const deleteDateObject = new Date(deleteDate);

  console.log(colors.red(`Are you sure you want to delete all trips for ${deleteDateObject.toDateString()}? (y/n): `));
  let confirm = readlineSync.prompt();

  while (confirm !== 'y' && confirm !== 'n') {
    console.log(colors.red(`Invalid entry. Are you sure you want to delete all trips for ${deleteDateObject.toDateString()}? (y/n): `));
    confirm = readlineSync.prompt();
  }

  const userJSON = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
  const userData = JSON.parse(userJSON).filter((element) => {
    const currentTripDate = new Date(element.begin);
    return currentTripDate.toDateString() !== deleteDateObject.toDateString();
  });

  const toSave = JSON.stringify(userData);
  fs.writeFileSync(`${__dirname}/data/data.json`, toSave, 'utf-8');
  console.log(colors.green('Deleted.'));
}

module.exports = removeADay;
