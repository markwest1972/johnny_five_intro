var five = require("johnny-five");
var myBoard, myServo, myPotentiometer;

myBoard = new five.Board();
myBoard.on("ready", function() {

  myServo = new five.Servo(11);

  myLed = new five.Led(5);

  myPotentiometer = new five.Sensor({
    pin: "A0",
    freq: 250
  });

  myPotentiometer.scale(0, 180).on("data", function() {
    myLed.brightness(Math.floor(this.raw / 4));
    myServo.to(this.scaled);
  });

  myBoard.repl.inject({
    replServo: myServo,
    replLed: myLed
  });
});
