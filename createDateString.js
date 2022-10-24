/*
Input: date object
Output: formatted string to be used in file systems
 */

async function createDateString(date) {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().length === 1 ? `0${(date.getMonth() + 1).toString()}` : (date.getMonth() + 1).toString();
  const day = date.getDate().toString().length === 1 ? `0${date.getDate().toString()}` : date.getDate().toString();
  return `${year}-${month}-${day}`;
}

module.exports = createDateString;
