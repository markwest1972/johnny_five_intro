# Exercise Two : Simple LED Blink #

## Summary ##

In this exercise you will install Johnny-Five and use it to make the built in LED on the Arduino Blink on and off at a specified interval.

## Requirements ##

* A Mac, Linux or Windows machine with Node.js and the Arduino IDE installed (see exercise one).
* An Arduino UNO.
* A type 2 USB Cable.

## Steps ##

#### Step 1 : Install Firmata on the Arduino UNO ####

As the Arduino UNO doesn't natively run Javascript we need to install Firmata on it.  Firmata provides an API that Johnny-Five uses to control the Arduino UNO over a serial connection.

To install Firmata onto your Arduino UNO:
1. Connect the Arduino UNO to your PC using the USB Cable
2. Open the Arduino IDE, select: _File > Examples > Firmata > StandardFirmata_
3. Click the "Upload" button.
4. "Done Uploading" will appear once the upload is complete.

Having problems?  You may need to adjust one of the following before trying the upload process one more time:
* Select : _Tools > Board_ and ensure that "Arduino UNO" is selected.
* Select : _Tools > Serial Port_ and select another serial port.  The correct port will probably look something like  "/dev/tty.usbmodem:XXXX"
* Check the USB Cable is connected - consider also trying a different cable.
* You can also try pressing the Reset Button on the UNO.

#### Step 2 : Install Johnny-Five ####

The Node.js installation from exercise one includes the npm package manager.  This can be used to download and install node modules both globally (for all Node.js processes on your PC) or locally (for specific Node.js applications).

To install Johnny-Five:
 1. Create a directory for all your Johnny-Five examples.  We'll call this your *johnny_five_intro root directory* from now on.
 2. Create a package called "package.json" in the above directory.
 3. Populate the "package.json" file as follows:

        {
             "name": "johnny_five_intro",
             "version": "1.0.0"
        }

 4. Open a command prompt and run the following command in your *johnny_five_intro root directory* (which contains the "package.json" file) : `npm install johnny-five --save`.

Your *johnny_five_intro root directory* should now have a sub-directory called _node_modules_.  This contains the Johnny-Five code and all of it's Node.js dependancies.  The "package.json" file has also been updated to include a dependancy reference to Johnny-Five.  This makes your code portable, as running `npm install` in the same directory as a package.json file will download all the dependancies described in that file.

Note that you have just installed Johnny-Five **locally**, which means that it will be visible to all Johnny_five programs in your *johnny_five_intro root directory*.

#### Step 3 : Blink Baby Blink! ####

Now you are finally ready to interact with your Arduino UNO!  

1. Create a new file called "02_simple_led_blink.js"in your *johnny_five_intro root directory*.
2. Populate this new file with the following Javascript code:

        var five = require("johnny-five");

        var myBoard, myLed;

        myBoard = new five.Board();

        myBoard.on("ready", function() {

            myLed = new five.Led(13);

            myLed.blink(500);

        });
3. Save the file.
4. Make sure your Arduino UNO is connected to your PC.
5. In the command prompt, navigate to your *johnny_five_intro root directory* and run the command "node 02_simple_led_blink.js".  This will cause the LED next to Pin 13 on the Arduino UNO to blink at intervals of 500 milliseconds.
5. To kill the process use Control C (on the Mac).
6. Change the argument to the _myLed.blink_ statement and run the example again.

## Learning Summary ##

In this section you setup up the Arduino UNO to work with Johnny-Five via the Firmata API.  You also installed Johnny-Five locally (as opposed to globally) using the npm package manager.  Note that we are going to use npm to install additional Node.js modules in later exercises.

Arguably the most important part of this exercise is the introduction to the Johnny-Five DSL.  In ths example the code did the following:
* Imported the Johnny-Five module.
* Set up the Arduino UNO Board and waited for the Board to return a "ready" event before continuing.
* Instantiated the LED Object (the LED connected to Pin 13 on the Arduino UNO) and provided methods for interacting with it.
