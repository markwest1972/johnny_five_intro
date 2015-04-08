# Excercise Two : Simple LED Blink #

## Summary ##

In this section you will install Johnny-Five and use it to make the built in LED on the Arduino Blink on and off at an interval of your choice.

## Requirements ##

* A Mac, Linux or Windows machine with Node.js and the Arduino IDE installed.
* An Arduino UNO.
* A type 2 USB Cable.

## Steps ##

#### Step 1 : Install Firmata on the Arduino UNO ####

As the Arduino UNO doesn't natively run Javascript we need to install Firmata.  This allows Johnny-Five to control with the Arduino UNO over a serial connection.

1. Connect the Arduino UNO to your PC using the USB Cable
2. Open the Arduino IDE, select: _File > Examples > Firmata > StandardFirmata_
3. Click the "Upload" button.
4. "Done Uploading" will appear once the upload is complete.

Having problems?  You may need to adjust one of the following before trying the upload process one more time:
* Select : _Tools > Board_ and ensure that "Arduino UNO" is selected. 
* Select : _Tools > Serial Port_ and select another serial port.  The correct port will probably look something like  "/dev/tty.usbmodem:XXXX"
* Press the Reset Button on the UNO.

#### Step 2 : Install Johnny-Five ####

The Node.js installation includes the npm package manager.  This can be used to download and install node modules such as Johnny-Five.

1. Create a directory for all your Johnny-Five examples.
2. Create a package called "package.json" in the above directory.
3. Populate the "package.json" files as follows:
```json
{
    "name": "johnny_five_intro",
    "version": "1.0.0"
}
```
4. Open a command prompt and run the following command in the directory containing the "package.json" file: `npm install johnny-five --save`.

The folder where you ran the npm command now contains a folder called _node_modules_.  This folder contains the Johnny-Five code and all of it's dependancies.  The package.json has also been updated to include a dependancy reference to Johnny-Five, making your code portable, as running `npm install` in the same directory as a package.json file will download all the dependancies described in the file. 

You have just installed Johnny-Five **locally**, which means that it is only visible from within this file.

#### Step 3 : Blink Baby Blink! ####

Now you are ready to interact with your Arduino UNO!  

1. Create a new file called "02_simple_led_blink.js"in the root of the directory you created in the previous step (we'll call this the *johnny-five-intro root directory* for the rest of this workshop).
2. Populate this file with the following Javascript:
```javascript
var five = require("johnny-five");
var myBoard, myLed;
myBoard = new five.Board();
  myBoard.on("ready", function() {
    myLed = new five.Led(13);
    myLed.blink(500);
});
```
3. Save the file.
4. In the command prompt, navigate to the *johnny-five-intro root directory* and run the command "node simple_LED_blink.js".  This will cause the LED next to Pin 13 on the Arduino UNO to blink at intervals of 500 milliseconds.
5. To kill the process use Control C (on the Mac).
6. Change the argument to _myLed.blink_ and run the example again.

## Learning Summary ##

In this section you setup up the Arduino UNO to work with Johnny-Five via the Firmata API.  You also installed Johnny-Five locally (as opposed to globally) in your project using the npm package manager.  Note that we'll use npm to install additional Node.js modules in later excercises.

Arduably the most important part of this excercise is the introduction to the Johnny-Five DSL.  This code did the following:
* Imported the Johnny-Five module.
* Setup the Arduino UNO Board.
* Instansiated the LED Object (the LED connected to Pin 13 on the Arduino UNO) and provided methods for interacting with it.
