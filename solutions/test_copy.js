var five = require("johnny-five");
var keypress = require("keypress");
var myBoard, myServo;
var brightness = 0;

keypress(process.stdin);
myBoard = new five.Board();
myBoard.on("ready", function() {

   myServo = new five.Servo(11);

   myServo.center();

   myLed = new five.Led(5);

   myLed.brightness(brightness);

   process.stdin.resume();
   process.stdin.setEncoding("utf8");
   process.stdin.setRawMode(true);

   process.stdin.on("keypress", function(ch, key) {

      if ( key.name === 'left' ) {
        console.log('...Moving Servo Left' + myServo.position);
        myServo.step(validateServoMove(10, myServo.position));
      }

      if ( key.name === 'right' ) {
        console.log('...Moving Servo Right' + myServo.position);
        myServo.step(validateServoMove(-10, myServo.position));
      }

      if ( key.name === 'space' ) {
        console.log('...Centering Servo');
        myServo.center();
      }

      if ( key.name === 'up' ) {
        validateAndAdjustLedBrightness(20, myServo);
      }

      if ( key.name === 'down' ) {
        validateAndAdjustLedBrightness(-20, myServo);
      }
   });
});

function validateAndAdjustLedBrightness(adjustment){

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

function validateServoMove(adjustment, position){

  var newPosition = (position + adjustment);

  if (newPosition < 1 || newPosition > 179 ) {
    console.log('...Servo cannot be moved further in that direction');
    adjustment = 0;
  }else{
    console.log('...Adjusting Servo to angle ['+(position += adjustment)+']');
  }

  return adjustment;
}
