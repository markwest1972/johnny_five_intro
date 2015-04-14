# Exercise Five : Keyboard, LED and Servo #

## Summary ##

[MQ Telemetry Transport](http://mqtt.org) is a publish/subscribe messaging protocol, designed for constrained devices and low-bandwidth, high-latency or unreliable networks.  Due to it's small footprint it is quickly becoming the de-facto messaging standard for the Internet of Things,

In this exercise we'll wire up our Johnny-Five LED and Servo example to a Public MQTT Broker.  We'll then be able use any MQTT Client to communicate with our circuit.  For simplicitys sake we'll use the [Hive MQ Web Browser MQTT CLient](http://www.hivemq.com/demos/websocket-client/), although you are welcome to write your own client if you wish!

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
2. Check your "package.json" file - an MQTT dependancy should now have been added.
3. The MQTT module will have been locally installed under the _node_modules_ directory.

#### Step 3 : Adding MQTT to the Johnny-Five Controller and making it ready to receive commands ####

You will now set up a Johnny-Five controller with a connection to an Public MQTT Broker.

1. Create a new Javascript source file containing the following Javascript code:

        var five = require("johnny-five");
        var mqtt = require("mqtt");
        var myBoard, myServo, myLed;
        var brightness = 0;
        var subscribeTopic = 'command_from_mwe';
        var publishTopic = 'response_to_mwe';

        myBoard = new five.Board();
        myBoard.on("ready", function() {

           myServo = new five.Servo(11);

           myServo.center();

           myLed = new five.Led(5);

           myLed.brightness(brightness);

           var options = { host: "test.mosca.io", port: "1883" };

           var client  = mqtt.connect(options);
           client.on('connect', function () {
             client.subscribe(subscribeTopic);
           });

           client.on('message', function (topic, payload) {

             var message = payload.toString();

             console.log('Incoming message['+message+']');

              if ( message === 'left' )  {
                myServo.step(validateServoMove(10, myServo.position));
                client.publish(publishTopic, 'Servo angle ['+myServo.position+']');
              }

              if ( message === 'right' ) {
                myServo.step(validateServoMove(-10, myServo.position));
                client.publish(publishTopic, 'Servo angle ['+myServo.position+']');
              }

              if ( message === 'centre' ) {
                myServo.center();
                client.publish(publishTopic, 'Servo angle ['+myServo.position+']');
              }

              if ( message === 'brighter' ) {
                validateAndAdjustLedBrightness(20);
                client.publish(publishTopic, 'LED brightness ['+brightness+']');
              }

              if ( message === 'dimmer' ) {
                validateAndAdjustLedBrightness(-20);
                client.publish(publishTopic, 'LED brightness ['+brightness+']');
              }
           });
        });

        function validateAndAdjustLedBrightness(adjustment){

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

          if (newPosition < 0 || newPosition > 180 ) {
            console.log('...Servo cannot be moved further in that direction');
            adjustment = 0;
          }else{
            console.log('...Adjusting Servo to angle ['+(position += adjustment)+']');
          }

          return adjustment;
        }

3. Change the _publishTopic_ and _subscribeTopic_ to be unique (in the example I've added my initials to the topic names).  This is to avoid problems when more than one person is taking this workshop at once.
4. Save the file.
5. Make sure your Arduino UNO is connected to your PC.
6. In the command prompt, navigate to your *johnny_five_intro root directory* and run your Javascript source file using the "node" command.

We've now set up Johnny-Five so it can communicate with the Public MQTT server at "test.mosca.io". Note that we are using the standard MQTT port : 1883.

#### Step 4 : Using the Hive MQ Web Browser MQTT Client to send commands to the Johnny-Five Controller ####

The next step is to communicate with our Johnny-Five instance using a web based MQTT client.  Luckily we don't have to create one ourselves and there is one available at http://www.hivemq.com/demos/websocket-client.  To use this we need to do the following:

1. First we need to connect to public MQTT server.  Use "test.mosca.io" as the host name and "80" for the port (the web based MQTT client is using Websockets to connect to the MQTT server, which is why the port is different from the one Johnny-Five is using).
2. Click the "Connect" button.
3. Set up a subscription to the topic Johnny-Five will publish to (the "publishTopic" you specified in the Johnny-Five code).
4. Finally publish one of the following commands to the topic Johnny-Five is listening to (the "subscribeTopic" you specified in the Johnny-Five code):
  - left
  - right
  - centre
  - brighter
  - dimmer
5. You should see your actuators reacting to the commands, and a response showing up in your web based MQTT Client.
6. If you don't like these commands, or want to have seperate communication topics for the LED and Servo, feel free to update the code to reflect this!

## Learning Summary ##

This example was also about introducing you to MQTT and showing how easy it is to add MQTT to your Johnny-Five code.  Creating an MQTT Client with publish and subscribe capabilities required the following code:

        var options = { host: "test.mosca.io", port: "1883" };

        var client  = mqtt.connect(options);
        client.on('connect', function () {
           client.subscribe(subscribeTopic);
        });

        client.on('message', function (topic, payload) { ... }
        client.publish(publishTopic, message);

 By implementing a Pub/Sub messaging model MQTT allows you to disseminate events to multiple subscribers, or listen for events on multiple publishers.  Adding your circuit to the internet of things is childs play.
