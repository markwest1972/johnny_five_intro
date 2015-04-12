var five = require("johnny-five");
var keypress = require("keypress");
var myBoard, myServo;
var brightness = 0;

keypress(process.stdin);
myBoard = new five.Board();
myBoard.on("ready", function() {

   myServo = new five.Servo(11);

   myLed = new five.Led(5);

   myLed.brightness(brightness);

   process.stdin.resume();
   process.stdin.setEncoding("utf8");
   process.stdin.setRawMode(true);

   process.stdin.on("keypress", function(ch, key) {

      if ( key.name === 'left' ) {
        console.log('...Moving Servo Left');
        adjustServo(10);
      }

      if ( key.name === 'right' ) {
        console.log('...Moving Servo Right');
        adjustServo(-10);
      }

      if ( key.name === 'space' ) {
        console.log('...Centering Servo');
        myServo.center();
      }

      if ( key.name === 'up' ) {
        adjustLedBrightness(20);
      }

      if ( key.name === 'down' ) {
        adjustLedBrightness(-20);
      }
   });
 });

 function adjustLedBrightness(adjustment){

   brightness += adjustment;

   if (brightness <= 0) {
     console.log('...LED cannot be dimmed futher');
     brightness = 0;
   }else if (brightness >= 255) {
     console.log('...LED cannot be brightened futher');
     brightness = 255;
   }else{
     console.log('...Adjusting LED to ['+brightness+']');
   }

   myLed.brightness(brightness);
 }

 function adjustServo(adjustment){

   myServo.position

   if (myServo.position <= 0 ) {
     console.log('...Servo cannot be moved further in that direction');
     brightness = 0;
   }else if (myServo.position >= 180) {
     console.log('...Servo cannot be moved further in that direction');
     myServo.position = 180;
   }else{
     console.log('...Adjusting Servo to angle ['+angle+']');
   }

   myServo.step(adjustment);
 }
