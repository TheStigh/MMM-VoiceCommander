## MMM-VoiceControlMe

* Control other modules that use voice commands with a single microphone.

* Built in motion detection for webcams. Puts your display to sleep or wakes it up.

* Built in support for sound files for audio responses.

* Hide and show pages of modules.

* Hide and show individual modules.

* No modification of other modules necessary.

* Offline by default. Online by controlling other modules. (Ex. AssistantMk2)


## Who did this?

This module is the result of a three developer collaboration. @TheStigh was the driving force behind
the idea and worked tirelessly towards its creation and completion. @sdetweil added critical and crucial
functionality to the module. Without his collaboration the module doesn't include its better features.
@Mykle1's original pages and hide/show commands were improved upon. He added some lesser features and is
the author of this wonderful README file.

## Inspirations

* MMM-voice by Strawberry 3.141
* motiondetector, camera by alexyak
* Hello-Lucy by Mykle1

## Examples

![](images/1.png)

![](images/2.png)

## Installation and requirements

* `git clone https://github.com/mykle1/MMM-VoiceControlMe` into the `~/MagicMirror/modules` directory.

* `cd MMM-VoiceControlMe`

* `cd installers`

* `bash dependencies.sh`


## Config.js entry and options
```
    {
    disabled: false,
    module: "MMM-VoiceControlMe",
    position: "top_center", 
    config: {
      timeout: 10, // seconds the microphone stays active after a command
      keyword: 'HELLO LUCY', // Your keyword
      debug: false,
      standByMethod: 'DPMS', // Pi
      sounds: ["female_hi.wav"], // Add your sound names to this array
      startHideAll: true, // false = All modules shown at startup
      microphone: 0, // Please set correct microphone from the cat output after installation
      speed: 1000,
      activateMotion: false, // true if you have a webcam and want motion detection
  mainPageModules: ["MMM-VoiceControlMe"], // Add modules to pages 
  pageTwoModules: [], // Add modules to pages 
  pageThreeModules: [], // Add modules to pages 
  pageFourModules: [], // Add modules to pages 
  pageFiveModules: [], // Add modules to pages 
  pageSixModules: [], // Add modules to pages 
  pageSevenModules: [], // Add modules to pages 
  pageEightModules: [], // Add modules to pages 
  pageNineModules: [], // Add modules to pages 
  pageTenModules: [], // Add modules to pages 
  captureIntervalTime: 1000, // How often the motion detector checks activity 1 second 
      scoreThreshold: 20,
      timeoutMotion: 120000 // 2 minutes of no activity turns off display
           }
    },
```
##
