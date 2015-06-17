# Johnny-Five Introduction Workshop

This is a set of exercises for a 2-3 hour workshop I will be running in Spring/Summer 2015.  The workshop is aimed at introducing attendees to Arduino, Johnny-Five, Node.js and Javascript.

In this workshop we will use the Arduino UNO, but Johnny-Five supports a range of platforms.  [Check out the Johnny-Five pages to find out more](http://johnny-five.io).

The exercises revolve mainly about using different types of sensors (input) to control different types of actuators (output).  The last exercise involves using a public MQTT broker for communication between different Johnny-Five processes.

Note that [code for all exercises can be found here](https://github.com/markwest1972/johnny_five_intro/tree/master/solutions).

This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.

## How Johnny-Five works

![Johnny-Five setup](https://github.com/markwest1972/johnny_five_intro/blob/master/assets/Johnny-Five%20set%20up.png)

Johnny-Five can also connect over Bluetooth and WIFI, but this requires extra equipment.  To keep things cheap and simple, we'll use a serial cable for this workshop.

## Requirements

This workshop is setup to require a minimum amount of hardware:
* A Mac, Linux or Windows machine with Node.js and the Arduino IDE installed (see [exercise one](https://github.com/markwest1972/johnny_five_intro/blob/master/exercises/01_installation_and_setup.md)).
* 1 x Arduino UNO, flashed with Firmata (see [exercise two](https://github.com/markwest1972/johnny_five_intro/blob/master/exercises/02_simple_led_blink.md)).
* 1 x type 2 USB Cable.
* 1 x Breadboard (if you've never used a breadboard then [check out this tutorial](https://learn.sparkfun.com/tutorials/how-to-use-a-breadboard)).
* 1 x Potentiometer.
* 1 x Button.
* 1 x Servo.
* 1 x 5mm LED.
* 1 x 330 ohm resistor (orange-orange-brown).
* 1 x 10k ohm resistor (brown-black-orange).
* Male-Male Jumper Leads.

## Exercises

#### [1. Installation and Setup](https://github.com/markwest1972/johnny_five_intro/blob/master/exercises/01_installation_and_setup.md)

In this first exercise you will install Node.js, the Arduino IDE and optionally the Atom text editor.

#### [2. Simple LED Blink](https://github.com/markwest1972/johnny_five_intro/blob/master/exercises/02_simple_led_blink.md)

In this exercise you will install Johnny-Five and use it to make the built in LED (output) on the Arduino Blink on and off at a specified interval.

#### [3. Controlling an LED with a Button](https://github.com/markwest1972/johnny_five_intro/blob/master/exercises/03_led_and_button.md)

In this exercise you will use Johnny-Five to dim and brighten the LED (output) by using a Button (input). In addition you will learn about how you can use the Johnny-Five REPL.

#### [4. Controlling an LED and Servo with a Potentiometer](https://github.com/markwest1972/johnny_five_intro/blob/master/exercises/04_potentiometer_led_and_servo.md)

In this exercise you will expand your experience of  Johnny-Five by using a Potentiometer (input) to control a Servo (output) and LED (output).  You'll also learn more about the different types of Pin provided by the Arduino UNO.

#### [5. Controlling an LED and Servo with a Keyboard](https://github.com/markwest1972/johnny_five_intro/blob/master/exercises/05_keyboard_led_and_servo.md)

In this exercise you will learn how you can utilise other Node.js modules in your Johnny-Five project.  By adding adding the [keypress Node.js module](https://www.npmjs.com/package/keypress) we'll be able to control a Servo and LED using the keyboard.

#### [6. Adding MQTT to the Mix](https://github.com/markwest1972/johnny_five_intro/blob/master/exercises/06_adding_mqtt_to_the_mix.md)

[MQTT](http://mqtt.org) is quickly becoming the de-facto messaging standard for the Internet of Things, due to it's small footprint and simplicity.  In this exercise we'll add an MQTT broker to our solution, making it possible to control our LED and Servo setup from an online MQTT client.

## Further Reading

The work here draws heavily on the [Arduino Experimenter's Guide for NodeJS](http://node-ardx.org), along with the [Johnny-Five API](http://johnny-five.io/api/).

You may also want to take a look at this book, by the people behind Johnny-Five : [Make: JavaScript Robotics: Building NodeBots with Johnny-Five, Raspberry Pi, Arduino, and BeagleBone](http://shop.oreilly.com/product/0636920031390.do).

## Disclaimer

This workshop is my attempt at creating a quick and simple Johnny-Five primer, based on my limited knowledge and experience with Johnny-Five, Arduino and Javascript.  I am by no means an expert with any of these and welcome corrections or suggestions for improvement are most welcome.

As for the code - it's been hacked together and can easily be improved.  If my code makes you want to cry, then tell me how I can make it better :)
