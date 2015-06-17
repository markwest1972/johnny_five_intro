# Exercise Four : Potentiometer, LED & Servo #

## Summary ##

In this exercise you will expand your experience of  Johnny-Five by using a Potentiometer (input) to control both a Servo (output) and an LED (output).  You'll also learn more about the different types of Pins provided by the Arduino UNO.

## Requirements ##

* A Mac, Linux or Windows machine with Node.js and the Arduino IDE installed (see exercise one).
* 1 x Arduino UNO, flashed with Firmata (see exercise two).
* 1 x type 2 USB Cable.
* 1 x Breadboard.
* 1 x Potentiometer.
* 1 x Servo.
* 1 x 5mm LED.
* 1 x 330 ohm resistor (orange-orange-brown).
* Male-Male Jumper Leads.

## Steps ##

#### Step 1 : Wire up the Components ####

This diagram (called a Fritzing) shows how you should wire up your circuit.  The Fritzing tool is [available for download here](http://fritzing.org/download/).

![Wiring Diagram](https://github.com/markwest1972/johnny_five_intro/blob/master/fritzings/04_potentiometer_led_and_servo.png)

Note that the Potentiometer is wired up to one of the Arduino UNO's Analog Pins, while the LED and Servo are wired to two of the UNO's Digital PWM Pins.
* _Analog Pins_ let you read/write analog values with 10 bits of resolution (i.e. 1024 different values).  
* _Digital Pins_ allow read/write of boolean values, basically off or on.
* _Digital PWM Pins_ provide 8 bits of resolution (i.e. 256 different values).  This is done by switching the Pin on and off at different speeds.

We'll explain more about this in the learning summary.

#### Step 2 : Running the Code ####

1. 1. Create a new Javascript source file (with a .js suffix) in your *johnny_five_intro root directory*.
2. Populate this file with the following Javascript code:

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
3. Save the file.
4. Make sure your Arduino UNO is connected to your PC.
5. In the command prompt, navigate to your *johnny_five_intro root directory* and run the command "node source_file_name.js".
6. Twiddle the Potentiometer back and forth.  The Servo should move to reflect the Potentiometer's position and the LED should brighten and dim.
7. To kill the process use Control C (on the Mac).

#### Step 3 : Experimenting with the REPL ####

Once again we added the actuators (in this case the LED and Servo) to the Johnny-Five REPL.  You can play with these by trying the following:

1. Run your Javascript source file as specified in Step 2.
2. Once the Node.js process is running, wait for the "Repl Initialized" message.
3. Try sweeping the Servo from the command line by using `replServo.sweep()`.  Stop the Servo by using `replServo.stop()`.  Centre the Servo by using `replServo.center()`.
4. Take a look at the [Johnny-Five documentation for the Servo class](http://johnny-five.io/api/servo/).  Here you'll find plenty of methods for controlling the Servo.
5. To kill the process use Control C (on the Mac).

## Learning Summary ##

In this section you learned about the Servo and Sensor classes.  The Sensor class especially is an all purpose class used for many different types of Sensor.

You also learned about the various Pin types provided by the Arduino UNO.  These have different usages, the details of which are outside of the scope of this workshop, but you'll find some more information about these below.

In this example the code did the following:
* Imported the Johnny-Five module.
* Set up the Arduino UNO Board and waited for the Board to return a "ready" event before continuing.
* Instantiated the Servo Object (connected to the Digital PWM Pin 11 on the Arduino UNO).  The 256 different output values supported by the PWM Pin tell the Servo to move to a variety of positions.
* Instantiated the LED Object (connected to the Digital PWM Pin 5 on the Arduino UNO).  The 256 different values supported by the PWM Pin will make LED light up with different intensities.
* Instantiated a Sensor Object to represent the Potentiomenter (connected to the Analog Pin "A0" on the Arduino UNO).  This allows for a range of inputs from 0 to 1024, depending on the position of the Potentiomenter.
    * Note that the 'freq' parameter refers to how often the Sensor will be read.
* On events from the Potentiometer:
    * ..the LED was brightened or dimmed accordingly.  
    * ..the 10 bit input value (provided by the Potentiometer) was mapped to the range of movement supported by the Servo (180 degrees) and the Servo was moved to reflect this.
* Finally the code added the Servo and LED to the Johnny-Five REPL.

###[Onwards to Exercise 5!](https://github.com/markwest1972/johnny_five_intro/blob/master/exercises/05_keyboard_led_and_servo.md)####
