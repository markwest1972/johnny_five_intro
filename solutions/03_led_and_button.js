var five = require("johnny-five");
var myBoard, myLed, myButton;

myBoard = new five.Board();

myBoard.on("ready", function() {

  myLed = new five.Led(9);

  myButton = new five.Button(4)

  myButton.on("up", function(value){
    myLed.fadeOut();
  });

  myButton.on("down", function(value){
    myLed.fadeIn();
  });

  this.repl.inject({
    replLed: myLed
  });

});
