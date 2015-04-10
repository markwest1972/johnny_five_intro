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

/**
Potentiometer
- why analog?  The analog pins let you read/write analog values - basically, instead of giving out a voltage of 0 or 5 (as with digital), they can give a range of voltages between 0 and 5 (both as input and output).  10 bits of resolution (i.e. 1024 different values.
- why freq?  The frequency in ms of data events. Defaults to 25ms.

Servo
- why PWM?  This allows digital pins to switch on and off quickly, simulating the effect of analog write.  8 bits of resolution, or 255 different values

*/
