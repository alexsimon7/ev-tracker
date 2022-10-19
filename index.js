const readlineSync = require('readline-sync');

const enterADay = require('./enterADay');
const viewDays = require('./viewDays');
const timelineGrabber = require('./timelineGrabber/timelineGrabber');

function correctMenuChoice(choice) {
  return ['1', '2', '3', '4', '5'].includes(choice);
}


async function run() {
  console.log('Welcome to EV Tracker');
  let menuSelection = '0';

  while (menuSelection !== '5') {
    console.log('Menu Options:\n (1) Enter a Trip,\n (2) Edit a Previous Trip,\n (3) Remove a Previous Trip,\n (4) View Trips,\n (5) Quit,\n (Type 1, 2, 3, 4, or 5): ');
    menuSelection = readlineSync.prompt();

    while (!(correctMenuChoice(menuSelection))) {
      console.clear();
      console.log('Invalid choice. Please select a menu option.');
      console.log('Menu Options:\n (1) Enter a New Trip,\n (2) Edit a Previous Trip,\n (3) Remove a Previous Trip,\n (4) View Trips,\n (5) Quit,\n (Type 1, 2, 3, 4, or 5): ');
      menuSelection = readlineSync.prompt();
    }

    if(menuSelection === '1') {
      await enterADay();
    } else if (menuSelection === '2') {
      // await editADay();
    } else if (menuSelection === '3') {
      // await removeADay();
    } else if (menuSelection === '4') {
      await viewDays();
    }
  }
}

run();


















