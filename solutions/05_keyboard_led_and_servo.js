var five = require("johnny-five");
var keypress = require("keypress");
var myBoard, myServo;

keypress(process.stdin);
myBoard = new five.Board();
myBoard.on("ready", function() {

   myServo = new five.Servo(11);

   myLed = new five.Led(4);

   process.stdin.resume();
   process.stdin.setEncoding("utf8");
   process.stdin.setRawMode(true);

   process.stdin.on("keypress", function(ch, key) {
      if (!key) {
        return;
      }

      // Code to control the LED and Servo (+, -, l, r and c)

   });
 });
