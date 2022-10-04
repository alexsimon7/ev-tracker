/*
Feature Changes:
DONE => 1. Need to store username and password in secure file (which would go into .gitignore) .env?
2. Need to deal with 2fa and next button
DONE => 3. Format the code within a function that takes the imputed date as an arg (date obj or string)
    3a. Refactor year/day/month to take input from function

Stylistic Changes:
DONE => 1. waitForTimeOut is depreciated; proper timeout
2. Error handling (stylistic way to handle potential errors at each step of the process to return a useful error and not crash program)
3. CSS Selectors vs Xpath (choice of use; consistency between usage)
DONE => 4. Format as exported module?

Other:
DONE => 1. Begin commits to Git/GitHub for version control
    1a. Purge unused dependencies

Input: Date Object (date of timeline to pull from Google)
Output: returns undefined, but downloads kml file to user's default chrome download folder
 */

require('dotenv').config();
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());


async function timelineGrabber(date) {
    function delay(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    let year = date.getFullYear().toString();
    let month = monthNames[date.getMonth()];
    let day = date.getDate() + " " + month.slice(0, 3);

    console.log(year, month, day);

    puppeteer.launch({ headless: false }).then(async browser => {
        const page = await browser.newPage();

        await page.goto('https://timeline.google.com/maps/timeline');
        await page.type('[type="email"]', `${process.env.USER_NAME}`);
        await page.click('#identifierNext');

        await delay(1500);
        await page.type('[type="password"]', `${process.env.PASSWORD}`);
        await page.click('#passwordNext');

        await delay(10000);
        await page.click('div[aria-label="Year"]');

        await delay(1500);
        let yearLocation = await page.$x(`//div[@aria-label="Year"]//child::div[contains(string(), "${year}") and @class="goog-menuitem"]`);
        await yearLocation[0].click();

        await delay(1500);
        await page.click('div[aria-label="Month"]');

        await delay(1500);
        let monthLocation = await page.$x(`//div[@aria-label="Month"]//child::div[contains(string(), "${month}") and @class="goog-menuitem"]`);
        await monthLocation[0].click();

        await delay(1500);
        await page.click('div[aria-label="Day"]');

        await delay(1500);
        await page.click(`td[aria-label="${day}"]`);

        await delay(1500);
        await page.click('div[aria-label=" Settings "]');

        await delay(1500);
        let downloadKML = await page.$x('//div[@class="settings-menu goog-menu overflow-menu"][contains(@style, "visibility: visible")]//child::div[@aria-label=" Export this day to KML "]');
        await downloadKML[0].click();

        await delay(25000);
        await browser.close();
    })
}

module.exports = timelineGrabber;



