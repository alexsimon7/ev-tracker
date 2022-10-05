/*
1. Build URL for (https://open-meteo.com/en/docs/historical-weather-api#api_form)
    - requires a longitude and latitude (will need to pull from KML) LONG/LAT
    - requires a date (ISO8601) (should be able to pull from date object)

2. Use Fetch to Access The API / Save Data



3. Use the Time from the Date Object to Find the Closest Temp Reading, save that



 */
const fetch = require('node-fetch');
let exampleURL = "https://archive-api.open-meteo.com/v1/era5?latitude=52.52&longitude=13.41&start_date=2022-01-01&end_date=2022-01-01&hourly=temperature_2m&temperature_unit=fahrenheit";






async function getTemp(url) {
    try{
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch(e) {
        console.log(e.message)
    }

}

getTemp(exampleURL);



