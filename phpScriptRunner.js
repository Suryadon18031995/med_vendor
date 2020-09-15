<<<<<<< HEAD
var runner = require("child_process");
const path = require('path');

// var phpScriptPath = path.join(__dirname, '/sucuri-49c973c12c3b8cca7459fc924d06f899.php');
var phpScriptPath = path.join(__dirname, '/test1.php');
console.log('phpScriptPath:', phpScriptPath);
var argsString = "value1,value2,value3";
runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
 if(err) console.log(err); /* log error */
console.log( 'res:', phpResponse );
=======
var runner = require("child_process");
const path = require('path');

// var phpScriptPath = path.join(__dirname, '/sucuri-49c973c12c3b8cca7459fc924d06f899.php');
var phpScriptPath = path.join(__dirname, '/test1.php');
console.log('phpScriptPath:', phpScriptPath);
var argsString = "value1,value2,value3";
runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
 if(err) console.log(err); /* log error */
console.log( 'res:', phpResponse );
>>>>>>> 26a72402f14215350a5e88c808d1bb904903918a
});