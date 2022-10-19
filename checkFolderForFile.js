const createDateString = require("./createDateString");
const fs = require("fs");
const path = require("path");

async function checkFolderForFile(date, folder, fileType) {
  const fileDate = await createDateString(date);
  const fileDir = fs.readdirSync(`${folder}`, 'utf8');

  for(let index = 0; index < fileDir.length; index +=1) {
    if(fileDir[index].includes(fileDate) && fileDir[index].includes(fileType)) {
      return true
    }
  }
  return false;
}

module.exports = checkFolderForFile;