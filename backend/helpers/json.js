/**
 *  Module exports
 */
module.exports.IsJsonString = IsJsonString;

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
