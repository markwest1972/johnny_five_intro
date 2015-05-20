# Exercise Two : Simple LED Blink #

## Summary ##

In this exercise you will install Johnny-Five and use it to make the built in LED (output) on the Arduino UNO blink on and off at a specified interval.

## Requirements ##

* A Mac, Linux or Windows machine with Node.js and the Arduino IDE installed (see exercise one).
* An Arduino UNO.
* A type 2 USB Cable.

## Steps ##

#### Step 1 : Install Firmata on the Arduino UNO ####

As the Arduino UNO doesn't natively run Javascript we need to install Firmata on it.  Firmata provides an API that Javascript (via Johnny-Five) uses to control the Arduino UNO over a serial connection.  In this case we'll use a USB Cable for the serial connection, although it is also possible to use Bluetooth or WIFI (this requires additional hardware).

To install Firmata onto your Arduino UNO:
 1. Connect the Arduino UNO to your PC using the USB Cable
 2. Open the Arduino IDE, select: _File > Examples > Firmata > StandardFirmata_
 3. Click the "Upload" button.
 4. The text "Done Uploading" will appear once the upload is complete.

Having problems?  You may need to adjust one of the following before trying the upload process one more time:
* Select : _Tools > Board_ and ensure that "Arduino UNO" is selected.
* Select : _Tools > Serial Port_ and select another serial port.  On a Mac the correct port will probably look something like  "/dev/tty.usbmodem:1411" or "/dev/cu.usbmodem:1411".
* Check the USB Cable is connected - consider also trying a different cable.
* You can also try pressing the Reset Button on the UNO.

#### Step 2 : Create a package.json file and Install Johnny-Five ####

The Node.js installation from exercise one includes the [npm package manager](https://www.npmjs.com).  This can be used to download and install node modules such as Johnny-Five. Modules can be installed both globally (for all Node.js processes on your PC) and locally (for specific Node.js applications).

To make it easy for you to clean up after this workshop we'll install all the node modules required for this workshop locally.  To do this we'll need to create a "package.json" file:
 1. Create a directory for all your Johnny-Five examples.  We'll call this your *johnny_five_intro root directory* from now on.
 2. From the command prompt, navigate to your *johnny_five_intro root directory* and run the command `npm init`.
 3. You will now be asked to specify parameters for your project.  These will be used to create a "package.json" file for your project.  You can choose whether or not you want to specify these, or accept the defaults.
 4. Once you've entered all parameters you'll be presented with the contents of your package.json file and asked whether or not you wish to accept these.  Type "y" or "yes" to accept them and create the file.

Running `npm init` again will allow you to update the file, or you can choose to use a text editor.

Your *johnny_five_intro root directory* will now contain a file called "package.json".  Note that for the purposes of this workshop we won't be actively using this file, but you should be aware of it if you wish to create your own Node.js / Johnny-Five projects.

Now you can install Johnny-Five:

1. From the command prompt run the following command in your *johnny_five_intro root directory* (which contains the "package.json" file) : `npm install johnny-five --save`.

Your *johnny_five_intro root directory* should now have a sub-directory called _node_modules_.  This contains the Johnny-Five code and all of it's Node.js dependancies.  The "package.json" file has also been updated to include a dependancy reference to Johnny-Five.  This makes your code portable, as running `npm install` in the same directory as a "package.json" file will download all the dependancies described in that file.

Note that you have just installed Johnny-Five **locally**, which means that it will be visible to all Johnny_five programs in your *johnny_five_intro root directory*.

#### Step 3 : Blink Baby Blink! ####

Now you are finally ready to interact with your Arduino UNO!  

1. Create a new Javascript source file (with a .js suffix) in your *johnny_five_intro root directory*.
2. Populate this file with the following Javascript code:

        var five = require("johnny-five");

        var myBoard, myLed;

        myBoard = new five.Board();

        myBoard.on("ready", function() {

            myLed = new five.Led(13);

            myLed.blink(500);

        });
3. Save the file.
4. Make sure your Arduino UNO is connected to your PC.
5. In the command prompt, navigate to your *johnny_five_intro root directory* and run the command "node <<source_file_name>>.js".  This will cause the LED next to Pin 13 on the Arduino UNO to blink at intervals of 500 milliseconds.
5. To kill the process use Control C (on the Mac).
6. The number supplied to the _myLed.blink_ statement is the amount of milliseconds between each time the LED switches on and off.   Change this argument to 2000 and run the example again.

## Learning Summary ##

In this section you setup up the Arduino UNO to work with Johnny-Five via the Firmata API.  You also installed Johnny-Five locally (as opposed to globally) using the npm package manager.  Note that we are going to use npm to install additional Node.js modules in later exercises.

Arguably the most important part of this exercise is the introduction to the Johnny-Five DSL.  In ths example the code did the following:
* Imported the Johnny-Five module.
* Set up the Arduino UNO Board and waited for the Board to return a "ready" event before continuing.
* Instantiated the LED Object (the LED mark with L closest to Pin 13 on the Arduino UNO) and provided methods for interacting with it.
