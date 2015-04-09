//var five = require("johnny-five");

//var myBoard, /*myLed,*/ myPotentiometer, myServo;

//myBoard = new five.Board();

//myBoard.on("ready", function() {

  var five = require("johnny-five"),
  board, myServo;
  board = new five.Board();
  board.on("ready", function() {
    myServo = new five.Servo(9);

    board.repl.inject({
      servo: myServo
    });

    myServo.sweep();

    this.wait(5000, function(){
      myServo.stop();
      myServo.center();
    });
  });


/*  myPotentiometer = new five.Sensor({
    pin: "A0",
    freq: 250
  });*/

//  myLed = new five.Led(9);

//  myServo = new five.Servo(9);
/*
  myPotentiometer.on("read", function() {
    var rawValue = this.raw;
  //  myLed.brightness(Math.floor(rawValue / 4));
    myServo.to(five.Fn.map(rawValue, 0, 1023, 0, 179));
  });
*/
//  myBoard.repl.inject({
//    replServo: myServo//,
//    replLed: myLed
//  });

//});
