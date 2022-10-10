const readlineSync = require('readline-sync');
const timelineGrabber = require('./timelineGrabber');

function correctMenuChoice(choice) {
  return ['1', '2', '3', '4'].includes(choice);
}

function correctFormatOfDate(date) {
  return Date.parse(date);
}

function checkDateArrayForDate(dateArray, date) {
  return dateArray.filter((element) => element.valueOf() === date.valueOf()).length === 1;
}

function addDates(dateArray) {
  let newDate = '';
  let continueToAdd = 'y';

  while (continueToAdd === 'y') {
    console.log('Enter a Date (mm/dd/yyyy): \n');
    newDate = readlineSync.prompt();

    while (!(correctFormatOfDate(newDate))) {
      console.log('Incorrect Date Format.');
      console.log('Enter a Date (mm/dd/yyyy): \n');
      newDate = readlineSync.prompt();
    }

    if (checkDateArrayForDate(dateArray, new Date(newDate))) {
      console.log('Date Already Exists. Date Not Added.\n');
    } else {
      dateArray.push(new Date(newDate));
    }

    console.log('Do you want to add another date? (y/n)\n');
    continueToAdd = readlineSync.prompt();

    while ((continueToAdd !== 'y') && (continueToAdd !== 'n')) {
      console.log('Incorrect entry.');
      console.log('Do you want to add another date? (y/n)\n');
      continueToAdd = readlineSync.prompt();
    }
  }
}

function removeDates(dateArray) {
  let removeDate = '';
  let continueToRemove = 'y';

  while (continueToRemove === 'y') {
    console.log('Enter a Date (mm/dd/yyyy): \n');
    removeDate = readlineSync.prompt();

    while (!(correctFormatOfDate(removeDate))) {
      console.log('Incorrect Date Format.\n');
      console.log('Enter a Date (mm/dd/yyyy): \n');
      removeDate = readlineSync.prompt();
    }

    if (checkDateArrayForDate(dateArray, new Date(removeDate))) {
      dateArray.splice(dateArray.indexOf(removeDate), 1);
      console.log('Date removed.\n');
    } else {
      console.log('Date does not exist. No date to remove.\n');
    }
    console.log('Do you want to remove another date? (y/n)\n');
    continueToRemove = readlineSync.prompt();

    while ((continueToRemove !== 'y') && (continueToRemove !== 'n')) {
      console.log('Incorrect entry.\n');
      console.log('Do you want to add another date? (y/n)\n');
      continueToRemove = readlineSync.prompt();
    }
  }
}

function displayDates(datesArray) {
  let displayString = '';

  datesArray.forEach((element, index) => {
    displayString += `${index + 1}. ${(element.getMonth() + 1)}/${element.getDate()}/${element.getFullYear()}\n`;
  });

  console.log(displayString);
}

function beginDownload(datesArray) {
  let quitStatus = 'n';

  console.log('Are you sure you want to download and quit? (y/n)\n');
  quitStatus = readlineSync.prompt();

  while ((quitStatus !== 'y') && (quitStatus !== 'n')) {
    console.log('Incorrect entry.\n');
    console.log('Are you sure you want to download and quit? (y/n)\n');
    quitStatus = readlineSync.prompt();
  }

  if (quitStatus === 'y') {
    datesArray.forEach((element) => {
      timelineGrabber(element);
    });
  }
}

function runTimelineGrabber() {
  console.clear();
  console.log('Welcome to Timeline Grabber');
  let current = '0';
  const datesToAdd = [];

  while (current !== '4') {
    console.log('Menu Options:\n (1) Add a Date to Download,\n (2) Remove a Date to Download,\n (3) Show Dates to Download,\n (4) Download and Quit,\n (Type 1, 2, 3, or 4): ');
    current = readlineSync.prompt();

    while (!(correctMenuChoice(current))) {
      console.clear();
      console.log('Incorrect entry.');
      console.log('Menu Options:\n (1) Add a Date to Download,\n (2) Remove a Date to Download,\n (3) Show Dates to Download,\n (4) Download and Quit,\n (Type 1, 2, 3, or 4): ');
      current = readlineSync.prompt();
    }

    if (current === '1') {
      addDates(datesToAdd);
    } else if (current === '2') {
      removeDates(datesToAdd);
    } else if (current === '3') {
      displayDates(datesToAdd);
    } else if (current === '4') {
      beginDownload(datesToAdd);
    }
  }
  console.log('Downloading...');
}

module.exports = runTimelineGrabber;
