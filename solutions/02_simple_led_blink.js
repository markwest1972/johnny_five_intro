var five = require("johnny-five");
var myBoard, myLed;

myBoard = new five.Board();

myBoard.on("ready", function() {

  myLed = new five.Led(13);

  myLed.blink(500);

});
