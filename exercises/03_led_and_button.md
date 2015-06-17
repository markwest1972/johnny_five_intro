# Exercise Three : LED & Button #

## Summary ##

In this exercise you will use Johnny-Five to dim and brighten the LED (output) by using a Button (input). You'll also learn about how you can use the Johnny-Five REPL for testing.

## Requirements ##

* A Mac, Linux or Windows machine with Node.js and the Arduino IDE installed (see exercise one).
* 1 x Arduino UNO, flashed with Firmata (see exercise two).
* 1 x type 2 USB Cable.
* 1 x Breadboard.
* 1 x Button.
* 1 x 5mm LED.
* 1 x 330 ohm resistor (orange-orange-brown).
* 1 x 10k ohm resistor (brown-black-orange).
* Male-Male Jumper Leads.

## Steps ##

#### Step 1 : Wire up the Components ####

This diagram (called a Fritzing) shows how you should wire up your circuit.  The Fritzing tool is [available for download here](http://fritzing.org/download/).

![Wiring Diagram](https://github.com/markwest1972/johnny_five_intro/blob/master/fritzings/03_led_and_button.png)

Note the usage of resistors in this circuit:
* The *330 ohm resistor* prevents the LED from being burnt out.
* The *10k ohm resistor* is included because an Arduino doesn't sense the same way we do (ie button pressed, button unpressed). Instead it looks at the voltage on the pin and decides whether it is HIGH or LOW. The button is set up to pull the Arduino's pin LOW when it is pressed, however, when the button is unpressed the voltage of the pin will float (causing occasional errors). To get the Arduino to reliably read the pin as HIGH when the button is unpressed, we add the pull up resistor.

#### Step 2 : Running the Code ####

1. Create a new Javascript source file (with a .js suffix) in your *johnny_five_intro root directory*.
2. Populate this file with the following Javascript code:

        var five = require("johnny-five");
        var myBoard, myLed, myButton;

        myBoard = new five.Board();

        myBoard.on("ready", function() {

          myLed = new five.Led(5);

          myButton = new five.Button(11)

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
3. Save the file.
4. Make sure your Arduino UNO is connected to your PC.
5. In the command prompt, navigate to your *johnny_five_intro root directory* and run the command "node source_file_name.js".
6. Experiment with switching the LED on and off with the Button.  Hold the Button down and the light becomes brighter.  Release the Button and the light fades.  The brightening and dimming of the light is controlled by the LED class's fadeIn() and fadeOut() methods.  
7. To kill the process use Control C (on the Mac).

*Note that a common problem is that the LED placed the wrong way round.  If your LED isn't working, try flipping it.*

#### Step 3 : Experimenting with the REPL ####

Let's take another look at the code you just ran, specifically the `this.repl.inject([...])` code block.  Here you added the LED in your circuit to Johnny-Five's REPL.  This allows you to control the LED directly from the command line.  Lets try this out now!

1. Run your Javascript source file as specified in Step 2.
2. Once the Node.js process is running, wait for the "Repl Initialized" message.
3. Try switching the LED on and off from the command line by using `replLed.toggle()`.
4. Take a look at the [Johnny-Five documentation for the LED class](http://johnny-five.io/api/led/).  Here you'll find plenty of methods for controlling the LED.  Try some of these out!
5. To kill the process use Control C (on the Mac).

## Learning Summary ##

In this section you learned how to wire up external components to the Arduino UNO.  You learned some use cases for including resistors in your circuit and finally learned about Fritzing diagrams.

You also learned more about the various methods supported by the LED Class, the location of the Johnny-Five documentation, and how to use the Johnny-Five REPL.

In this example the code did the following:
 * Imported the Johnny-Five module.
 * Set up the Arduino UNO Board and waited for the Board to return a "ready" event before continuing.
 * Instantiated the LED Object (connected to Pin 5 on the Arduino UNO).
 * Instantiated the Button Object (connected to Pin 11 on the Arduino UNO).
 * On events from the Button (press and release), triggered the fadeIn and fadeOut commands on the LED.
 * Added the LED to the Johnny-Five REPL.

###[Onwards to Exercise 4!](https://github.com/markwest1972/johnny_five_intro/blob/master/exercises/04_potentiometer_led_and_servo.md)####
