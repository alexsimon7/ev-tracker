const readlineSync = require('readline-sync');

const enterADay = require('./enterADay');
const viewDays = require('./viewDays');
const removeADay = require('./removeADay');

function correctMenuChoice(choice) {
  return ['1', '2', '3', '4'].includes(choice);
}

async function run() {
  console.log('Welcome to EV Tracker');
  let menuSelection = '0';

  while (menuSelection !== '4') {
    console.log("Menu Options:\n (1) Enter a Day's Trips\n (2) View Trips\n (3) Delete a Day's Trips\n (4) Quit\n (Type 1, 2, 3, or 4): ");
    menuSelection = readlineSync.prompt();

    while (!(correctMenuChoice(menuSelection))) {
      console.clear();
      console.log('Invalid choice. Please select a menu option.');
      console.log("Menu Options:\n (1) Enter a Day's Trips\n (2) View Trips\n (3) Delete a Day's Trips\n (4) Quit\n (Type 1, 2, 3, or 4): ");
      menuSelection = readlineSync.prompt();
    }

    if (menuSelection === '1') {
      await enterADay();
    } else if (menuSelection === '2') {
      await viewDays();
    } else if (menuSelection === '3') {
      await removeADay();
    }
  }
  console.log('Quiting...');
}

run();
