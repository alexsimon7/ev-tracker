/*
TODO:
  - Error Handling
 */

// Input: Date Object (date of timeline to pull from Google)
// Output: Returns undefined; downloads KML file for certain date to default download folder

require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function timelineGrabber(date) {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const year = date.getFullYear().toString();
  const month = monthNames[date.getMonth()];
  const day = `${date.getDate()} ${month.slice(0, 3)}`;

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://timeline.google.com/maps/timeline');
  await page.waitForSelector('[type="email"]');
  await page.type('[type="email"]', `${process.env.USER_NAME}`);
  await page.click('#identifierNext');

  await page.waitForSelector('[type="password"]', {visible: true});
  await page.type('[type="password"]', `${process.env.PASSWORD}`);
  await page.waitForSelector('#passwordNext');
  await page.click('#passwordNext');

  // 2fa occurs here; number of clicks/keystrokes will vary by user

  await delay(12000);
  await page.waitForSelector('div[aria-label="Year"]');
  await page.click('div[aria-label="Year"]');

  await page.waitForXPath(`//div[@aria-label="Year"]//child::div[contains(string(), "${year}") and @class="goog-menuitem"]`, {visible: true});
  const yearLocation = await page.$x(`//div[@aria-label="Year"]//child::div[contains(string(), "${year}") and @class="goog-menuitem"]`);
  await yearLocation[0].click();

  await page.waitForSelector('div[aria-label="Month"]');
  await page.click('div[aria-label="Month"]');

  await page.waitForXPath(`//div[@aria-label="Month"]//child::div[contains(string(), "${month}") and @class="goog-menuitem"]`);
  const monthLocation = await page.$x(`//div[@aria-label="Month"]//child::div[contains(string(), "${month}") and @class="goog-menuitem"]`);
  await monthLocation[0].click();

  await page.waitForSelector('div[aria-label="Day"]');
  await page.click('div[aria-label="Day"]');

  await page.waitForSelector(`td[aria-label="${day}"]`);
  await page.click(`td[aria-label="${day}"]`);

  await delay(3000);
  await page.waitForSelector('div[aria-label=" Settings "]');
  await page.click('div[aria-label=" Settings "]');

  await page.waitForXPath('//div[@class="settings-menu goog-menu overflow-menu"][contains(@style, "visibility: visible")]//child::div[@aria-label=" Export this day to KML "]');
  const downloadKML = await page.$x('//div[@class="settings-menu goog-menu overflow-menu"][contains(@style, "visibility: visible")]//child::div[@aria-label=" Export this day to KML "]');
  await downloadKML[0].click();

  await delay(5000);
  await browser.close();
}

module.exports = timelineGrabber;
