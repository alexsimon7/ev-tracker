/*
Input: None
Output: undefined, logs all trips in data.json
Specific Date, Month, Year
Distance (Above or Equal, Below or Equal to Given Number)
Avg Speed (Above or Equal, Below or Equal to Given Number)
Temp (Above or Equal, Below or Equal to Given Number)
Batt Percentage Used (Above or Equal, Below or Equal Given Number)
Used CC (Yes or No)
Mile Per Percentage (Above or Equal, Below or Equal)
 */

const fs = require('fs');
// const readlineSync = require('readline-sync');
const logDay = require('./logDay');

// function correctMenuChoice(choice) {
//   return ['1', '2', '3', '4', '5', '6', '7', '8'].includes(choice);
// }
// function correctFormatOfDate(date) {
//   return Date.parse(date);
// }
//
// async function viewDays() {
//   let filterChoice = '0';
//   let data = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`, 'utf8'));
//
//   console.log('Available Filters:\n1. Date\n2. Distance\n3. Average Speed\n4. Temperature\n5. Battery Percentage Used\n6. Mile Per Percent Battery\n7. Climate Control Used\n8. Display Results(Enter 1-8)');
//   filterChoice = readlineSync.prompt();
//
//   while(!(correctMenuChoice(filterChoice))) {
//     console.log('Invalid Entry.');
//     console.log('Available Filters:\n1. Date\n2. Distance\n3. Average Speed\n4. Temperature\n5. Battery Percentage Used\n6. Mile Per Percent Battery\n7. Climate Control Used\n8. Display Results(Enter 1-8)');
//     filterChoice = readlineSync.prompt();
//   }
//
//   switch (filterChoice) {
//     case '1':
//       console.log('Filter by date, month or year? (d/m/y)');
//       let dateFilter = readlineSync.prompt();
//
//       while(!(['d', 'm', 'y'].includes(dateFilter))) {
//         console.log('Invalid entry.');
//         console.log('Filter by date, month or year? (d/m/y)');
//         let dateFilter = readlineSync.prompt();
//       }
//
//       switch (dateFilter) {
//         case 'd':
//           let newDate = '';
//           console.log('Enter a Date (mm/dd/yyyy): ');
//           newDate = readlineSync.prompt();
//
//           while (!(correctFormatOfDate(newDate))) {
//             console.log('Incorrect Date Format.');
//             console.log('Enter a Date (mm/dd/yyyy): ');
//             newDate = readlineSync.prompt();
//           }
//
//           data = data.filter((element) => element.begin.toDateString() === newDate.to)
//
//           break;
//         case 'm':
//           break;
//         case 'y':
//           break;
//       }
//       break;
//     case '2':
//       // console.log('Enter a Distance Traveled: ');
//       // let distanceToFilter = readlineSync.prompt();
//       //
//       // while(Number.isNaN(Number.parseInt(distanceToFilter, 10)) || Number.parseInt(distanceToFilter, 10) < 0) {
//       //   console.log('Invalid entry.');
//       //   console.log('Enter a Distance Traveled: ');
//       //   distanceToFilter = readlineSync.prompt();
//       // }
//       //
//       // console.log(`Greater Than or Less Than? (+/-)`)
//       break;
//     case '3':
//       break;
//     case '4':
//       break;
//     case '5':
//       break;
//     case '6':
//       break;
//     case '7':
//       break;
//     case '8':
//       await logDay(data);
//       break;
//   }
// }
//
// viewDays();

async function viewDays() {
  const data = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`, 'utf8'));
  await logDay(data);
}

module.exports = viewDays;
