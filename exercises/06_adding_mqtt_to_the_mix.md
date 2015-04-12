# Exercise Five : Keyboard, LED and Servo #

## Summary ##

[MQ Telemetry Transport](http://mqtt.org) is a publish/subscribe messaging protocol, designed for constrained devices and low-bandwidth, high-latency or unreliable networks.  Due to it's small footprint it is quickly becoming the de-facto messaging standard for the Internet of Things,

In this exercise we'll wire up our Johnny-Five LED and Servo example to a Public MQTT Broker.  We'll then be able use any MQTT Client to communicate with our circuit.  In this case of this exercise we'll use the [Hive MQ Web Browswer MQTT CLient](http://www.hivemq.com/demos/websocket-client/), although you are welcome to write your own client if you wish!

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

**Note that this wiring is exactly the same as that in exercise 5.**

#### Step 2 : Adding MQTT to the Project ####

Once again the Node.js ecosystem makes it easy to add MQTT to your project, thanks to the [MQTT module for Node.js](https://www.npmjs.com/package/mqtt)!

1. Open a command prompt and run the following command in your *johnny_five_intro root directory* (which contains the "package.json" file) : `npm install mqtt --save`.
2. Check you "package.json" file - a keypress dependancy should now have been added.
3. The keypress module will have been locally installed under the _node_modules_ directory.

#### Step 3 : Adding MQTT to the Johnny-Five Controller ####



#### Step 4 : Using the Hive MQ Web Browswer MQTT CLient ####


## Learning Summary ##
