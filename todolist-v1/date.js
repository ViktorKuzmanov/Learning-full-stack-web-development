// Here I create my own module like Express.js named date.js
// This is how modules like Express.js work


// This is what we are exporting from this module. We just want the current date

// This is anonymus function in JS
module.exports.currentDate = function () {

  const today = new Date();
  const options = {
    weekday:"long",
    day:"numeric",
    month:"long"
  };
  return today.toLocaleDateString("en-US", options);
}
