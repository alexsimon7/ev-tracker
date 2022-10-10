const runTimeLineGrabber = require('./timelineGrabber/runTimelineGrabber');
const async = require('async');

async.series([
  function(callback) {
    runTimeLineGrabber();
    callback();
  },
], function(err) {
  console.log('Downloaded and Converted To JSON');
});















