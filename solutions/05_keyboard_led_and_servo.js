var five = require("johnny-five");
var keypress = require("keypress");
var myBoard, myServo;
var brightness = 0;

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

      if ( key.name === 'l' ) {
        console.log('Moving Servo Left');
        servo.step(10);
      }

      if ( key.name === 'r' ) {
        console.log('Moving Servo Right');
        servo.step(-10);
      }

      if ( key.name === 'c' ) {
        console.log('Centering Servo');
        servo.center();
      }

      if ( key.name === '+' ) {
        console.log('Brightening LED');
        led.brightness(brightness + 50);
      }

      if ( key.name === '-' ) {
        console.log('Dimming LED');
        led.brightness(brightness - 50);
      }
   });
 });
