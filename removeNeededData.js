const fs = require('fs');
const path = require('path');
const os = require('os');

let grabDate = new Date(2022, 8, 24);
let year = grabDate.getFullYear().toString();
let month = (grabDate.getMonth() + 1).toString().length === 1 ? '0' + (grabDate.getMonth() + 1).toString() : (grabDate.getMonth() + 1).toString();
let day = grabDate.getDate().toString().length ===1 ? '0' + grabDate.getDate().toString() : grabDate.getDate().toString();
let fileDate = `${year}-${month}-${day}`;


function convertMetersToMiles(meters) {
    let miles = meters / 1609.344;
    return miles.toFixed(2);
}

function timeElapsed(timeOne, timeTwo) {
    let totalSecondsElapsed = 0;

    totalSecondsElapsed = (((timeTwo.getHours() - timeOne.getHours()) * 60) * 60);

    totalSecondsElapsed -= ((timeOne.getMinutes() - timeTwo.getMinutes()) * 60);

    totalSecondsElapsed -= (timeOne.getSeconds() - timeTwo.getSeconds());

    return totalSecondsElapsed;
}

function convertToHours(seconds) {
    return (seconds / 60) / 60;
}


let readFile = fs.readFileSync(`${path.dirname(__dirname)}/ev-tracker/data/${fileDate}.json`, 'utf8');

let obj = JSON.parse(readFile);

// Start Time, End Time, Distance (in meters); name/address of previous point and subsequent point (check end point match begin drive, end drive begin point)

let neededData = [];


// known bug with unlabeled driving data, known bug with issue with missing beginning address and end address
obj.features.forEach((element, index) => {
    let routeSegment = {};
    //pull data from current element
    if(element.geometry.type === "LineString"  && element.properties.Category === 'Driving') {

        routeSegment.begin = new Date(element.properties.timespan.begin);
        routeSegment.end = new Date(element.properties.timespan.end);

        routeSegment.timeInRouteSeconds = timeElapsed(routeSegment.begin, routeSegment.end);
        routeSegment.timeInRouteHours = convertToHours(routeSegment.timeInRouteSeconds);

        routeSegment.distanceInMiles = convertMetersToMiles(Number.parseInt(element.properties.Distance));

        routeSegment.averageMilesPerHour = (routeSegment.distanceInMiles / routeSegment.timeInRouteHours).toFixed(2);


        if(obj.features[index - 1].geometry.type === 'Point' && obj.features[index - 1].properties.timespan.end === routeSegment.begin.toISOString()) {
            routeSegment.startAddressName = obj.features[index - 1].properties.name;
            routeSegment.startAddress = obj.features[index - 1].properties.address;
            routeSegment.startLongLat = obj.features[index - 1].geometry.coordinates;
        }

        if(obj.features[index + 1].geometry.type === 'Point' && obj.features[index + 1].properties.timespan.begin === routeSegment.end.toISOString()) {
            routeSegment.endAddressName = obj.features[index + 1].properties.name;
            routeSegment.endAddress = obj.features[index + 1].properties.address;
            routeSegment.endLongLat = obj.features[index + 1].geometry.coordinates;
        }

    }

    if(Object.hasOwn(routeSegment, 'begin')) {
        neededData.push(routeSegment);
    }

})

console.log(neededData)