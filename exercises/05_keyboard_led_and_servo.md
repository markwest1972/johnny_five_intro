# Exercise Five : Keyboard, LED and Servo #

## Summary ##

In this exercise you will learn how you can utilise other Node.js modules in your Johnny-Five project.  By adding the [keypress Node.js module](https://www.npmjs.com/package/keypress) we'll be able to control a Servo and LED using the keyboard.

## Requirements ##

* A Mac, Linux or Windows machine with Node.js and the Arduino IDE installed (see exercise one).
* 1 x Arduino UNO, flashed with Firmata (see exercise two).
* 1 x type 2 USB Cable.
* 1 x Breadboard.
* 1 x Servo.
* 1 x 5mm LED.
* 1 x 330 ohm resistor (orange-orange-brown).
* Male-Male Jumper Leads.

## Steps ##

#### Step 1 : Wire up the Components ####

This diagram (called a Fritzing) shows how you should wire up your circuit.  The Fritzing tool is [available for download here](http://fritzing.org/download/).

![Wiring Diagram](https://github.com/markwest1972/johnny_five_intro/blob/master/fritzings/05_keyboard_led_and_servo.png)

**Note that this wiring is exactly the same as exercise 4, apart from that the Potentiometer has been removed.**

#### Step 2 : Adding keypress to the Project ####

This is where the Node.js comes in handy!  The [keypress Node.js module](https://www.npmjs.com/package/keypress) makes it easy to handle keypress events in your Node.js code!

1. Open a command prompt and run the following command in your *johnny_five_intro root directory* (which contains the "package.json" file) : `npm install keypress --save`.
2. Check you "package.json" file - a keypress dependancy should now have been added.
3. The keypress module will have been locally installed under the _node_modules_ directory.

#### Step 3 : Running the Code ####

1. Create a new file called "04_potentiometer_led_and_servo.js"in your *johnny_five_intro root directory*.
2. Populate this new file with the following Javascript code:

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
                myServo.step(validateServoMove(-10, myServo.position));
              }

              if ( key.name === 'right' ) {
                console.log('...Moving Servo Right' + myServo.position);
                myServo.step(validateServoMove(10, myServo.position));
              }

              if ( key.name === 'space' ) {
                console.log('...Centering Servo');
                myServo.center();
              }

              if ( key.name === 'up' ) {
                adjustLedBrightness(20, myServo);
              }

              if ( key.name === 'down' ) {
                adjustLedBrightness(-20, myServo);
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

3. Save the file.
4. Make sure your Arduino UNO is connected to your PC.
5. In the command prompt, navigate to your *johnny_five_intro root directory* and run the command "node 05_keyboard_led_and_servo.js".
6. Use the "up" and "down" arrow keys to control the brightness of the LED.  Use the "left" and "right" arrowkeys to move the Servo left and right.  Finally use the "pace bar to centre the Servo.
7. To kill the process use Control C (on the Mac).

## Learning Summary ##

In this section you learned how you can exploit the Node.js ecosystem to add extra functionality to your Johnny-Five project.

You should by now be familar with Johnny-Five code, but there are a couple of Node specific addition to the code that we can review here:

* `keypress(process.stdin);` Node's global object "process" has two properties called ".stdin" and ".stdout", which are essentially streams. You can write things into the stdout and listen to the 'data' event in the stdin stream.  Here we are setting up keypress to monitor ".stdin".  
* `process.stdin.resume();` Initializes the stdin reading process.
* `process.stdin.setEncoding("utf8");` Set character encoding.  
* `process.stdin.setRawMode(true);` Fire events per keypress, not on carriage return.
