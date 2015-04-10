var five = require("johnny-five");
var myBoard, myServo, myPotentiometer;

myBoard = new five.Board();
myBoard.on("ready", function() {

  myServo = new five.Servo(5);

  myLed = new five.Led(11);

  myPotentiometer = new five.Sensor({
    pin: "A0",
    freq: 250
  });

  myPotentiometer.on("read", function() {
    var rawValue = this.raw;
    myLed.brightness(Math.floor(rawValue / 4));
    myServo.to(five.Fn.map(rawValue, 0, 1023, 0, 179));
  });

  myBoard.repl.inject({
    servo: myServo,
    led: myLed
  });
});
