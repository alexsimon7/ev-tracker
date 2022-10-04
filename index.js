const timelineGrabber = require('./timelineGrabber/timelineGrabber.js');
const kmlToJSON = require('./kmlToJSON/kmlToJSON.js');

let grabDate = new Date(2022, 8, 24);

// timelineGrabber(grabDate);
let jsonObj = kmlToJSON(grabDate);

console.log(jsonObj);


