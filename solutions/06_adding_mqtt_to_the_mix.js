var five = require("johnny-five");
var mqtt = require("mqtt");
var myBoard, myServo, myLed;
var brightness = 0;
var commandTopic = 'command_from_client';
var responseTopic = 'response_to_client';

myBoard = new five.Board();
myBoard.on("ready", function() {

   myServo = new five.Servo(11);

   myServo.center();

   myLed = new five.Led(5);

   myLed.brightness(brightness);

   var options = { host: "test.mosca.io", port: "1883" };

   var client  = mqtt.connect(options);
   client.on('connect', function () {
     client.subscribe(commandTopic);
   });

   client.on('message', function (topic, payload) {

     var message = payload.toString();

     console.log('Incoming message['+message+']');

      if ( message === 'left' )  {
        myServo.step(validateServoMove(10, myServo.position));
        client.publish(responseTopic, 'Servo angle ['+myServo.position+']');
      }

      if ( message === 'right' ) {
        myServo.step(validateServoMove(-10, myServo.position));
        client.publish(responseTopic, 'Servo angle ['+myServo.position+']');
      }

      if ( message === 'centre' ) {
        myServo.center();
        client.publish(responseTopic, 'Servo angle ['+myServo.position+']');
      }

      if ( message === 'brighter' ) {
        validateAndAdjustLedBrightness(20);
        client.publish(responseTopic, 'LED brightness ['+brightness+']');
      }

      if ( message === 'dimmer' ) {
        validateAndAdjustLedBrightness(-20);
        client.publish(responseTopic, 'LED brightness ['+brightness+']');
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

  if (newPosition < 0 || newPosition > 180 ) {
    console.log('...Servo cannot be moved further in that direction');
    adjustment = 0;
  }else{
    console.log('...Adjusting Servo to angle ['+(position += adjustment)+']');
  }

  return adjustment;
}
