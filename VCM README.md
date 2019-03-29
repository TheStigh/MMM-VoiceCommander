# MMM-VoiceCommander

![](VCLogo.jpg)

## What can it do?

* Control other modules that use voice commands with a single microphone.
* Built in motion detection for webcams.
* Use hand gesture to mute/resume sound to issue new voice commands. (Requires cam)
* Take Selfies!  (Requires - https://github.com/alexyak/camera)
* Built in support for custom sound files.
* Hide and show pages of modules.
* Hide and show individual modules.
* No modification of other modules necessary.
* Offline by default. Online by controlling other modules. (Ex. AssistantMk2)


## Thanks go to . . .

* @sdetweil added crucial microphone release functionality to the module.
* @Mykle1's original pages and hide/show commands were improved upon and custom sound support.
* @cowboysdude for his array magic and Skype consultations.

## Inspirations

* MMM-voice by Strawberry 3.141
* motiondetector, camera by alexyak
* Hello-Lucy by Mykle1

## Tested On

* HP Elite 8300 - Ubuntu 18.04 LTS
* HP Elite HPEu - Ubuntu 16.04 LTS
* HP G60 Laptop - Ubuntu 16.04 LTS
* AMD64 - Ubuntu 16.04/18.04
* Tinker Board S - TinkerOS 2.0.8
* USB Logitech C920
* Several integrated laptop cams

## Installation and requirements

* `git clone https://github.com/thestigh/MMM-VoiceCommander` into the `~/MagicMirror/modules` directory.

* `cd MMM-VoiceCommander`

* `cd installers`

* `bash dependencies.sh`


## Config.js entry and options

{
    disabled: false,
    module: "MMM-VoiceCommander",
    position: "top_center",
    config: {
        timeout: 10,                                // timeout listening for a command/sentence
        defaultOnStartup: 'MMM-VoiceCommander',     // keep this so this module is always present on MM
        keyword: 'HELLO LUCY',                      // keyword to activate listening for a command/sentence
        debug: false,                               // get debug information in console
        standByMethod: 'DPMS',                      // 'DPMS' = anything else than RPi or 'PI'
		sounds: ["female_hi.wav"],                  // welcome sound at startup, add several for a random choice of welcome sounds
        startHideAll: true,                         // if true, all modules start as hidden
        microphone: 0,                              // Please set correct microphone from the cat output after installation
        speed: 1000,                                // transition speed between show/no-show/show in milliseconds
        activateMotion: false,                      // if true, webcam will be used to activate/deactivate MM on movement
        onlyHotword: false,                         // TBA - Hotword only to activate external module by sendNotification
        timeoutSeconds: 10,                         // seconds to wait for external module to confirm control of mic
		captureIntervalTime: 1000,                  // how often should the webcam check for motion, in milliseconds, default 1 second
        scoreThreshold: 20,                         // threshold to assume motion/no-motion -> see console log for score
        timeoutMotion: 120000,                      // timeout with no motion until sleep monitor, in milliseconds, default 2 minutes
        muteThreshold: 2000,                        // motion level to activate mute of speaker
        muteVolumeLevel: 1,                         // what volume level to set speaker on activated mute
        muteNormalLevel: 50,                        // set normal volume level on startup
        muteTimer: 10000,                           // how long in milliseconds to mute the speaker
		mainPageModules: ["MMM-VoiceCommander"],    // default modules to show on page one/startup
        pageTwoModules: [],                         // modules to show on page two
		pageThreeModules: [],                       // modules to show on page two
		pageFourModules: [],                        // modules to show on page two
		pageFiveModules: [],                        // modules to show on page two
		pageSixModules: [],                         // modules to show on page two
		pageSevenModules: [],                       // modules to show on page two
		pageEightModules: [],                       // modules to show on page two
		pageNineModules: [],                        // modules to show on page two
		pageTenModules: []                          // modules to show on page two
           }
    },

## Default modules and their commands

### [MMM-VoiceCommander](https://github.com/TheStigh/MMM-VoiceCommander)

* Hello Lucy (Replace Hello Lucy with your keyword)
* Go Online (Must have MMM-AssistantMk2 installed)
* Activate Assistant (To be implemented - Must have MMM-AssistantMk2 installed)
* Show Assistant
* Hide Assistant
* Go To Sleep
* Please Wake Up
* Open help
* Close help
* Show Main Page
* Show Page Two
* Show Page Three
* Show Page Four
* Show Page Five
* Show Page Six
* Show Page Seven
* Show Page Eight
* Show Page Nine
* Show Page Ten
* Show Modules
* Hide Modules
* Show Camera - relies on (https://github.com/alexyak/camera)
* Hide Camera - relies on (https://github.com/alexyak/camera)
* Selfie - relies on (https://github.com/alexyak/camera)
                       
### [MMM-WindyV2](https://github.com/TheStigh/MMM-WindyV2)(Requires MMM-WindyV2)

#### Requires installation of MMM-WindyV2

* Hide Wind
* Show Wind
* Zoom In
* Zoom Out
* Show Default Zoom
* Show Me Wind
* Show Me Rain
* Show Me Clouds
* Show Me Temperature
* Show Me Pressure
* Show Me Currents
* Show Me Waves
* Rotate Layer
* Play Animation
* Cancel Animation

### Control [MMM-AssistantMk2](https://github.com/eouia/MMM-AssistantMk2)

* Click [here](https://github.com/eouia/MMM-AssistantMk2) for the repo and documentation.

### Hide/Show Supported Modules

* [MMM-AfterShip](https://github.com/mykle1/MMM-AfterShip) - Hide/Show Shipping
* [MMM-ATM](https://github.com/mykle1/MMM-ATM) - Hide/Show Trivia
* [MMM-BMW-DS](https://github.com/mykle1/MMM-BMW-DS) - Hide/Show Weather
* [MMM-CARDS](https://github.com/mykle1/MMM-CARDS) - Hide/Show Cards
* [MMM-Census](https://github.com/mykle1/MMM-Census) - Hide/Show Census
* [MMM-Cocktails](https://github.com/mykle1/MMM-Cocltails) - Hide/Show Cocktails
* [MMM-EARTH](https://github.com/mykle1/MMM-EARTH) - Hide/Show Earth
* [MMM-EarthWinds](https://github.com/mykle1/MMM-EarthWinds) - Hide/Show EarthWind
* [MMM-EasyBack](https://github.com/mykle1/MMM-EasyBack) - Hide/Show Background
* [MMM-EasyPix](https://github.com/mykle1/MMM-EasyPix) - Hide/Show Lucy 
* [MMM-Events](https://github.com/mykle1/MMM-Events) - Hide/Show Events
* [MMM-EventHorizon](https://github.com/mykle1/MMM-EventHorizon) - Hide/Show Timer
* [MMM-EyeCandy](https://github.com/mykle1/MMM-EyeCandy) - Hide/Show EyeCandy
* [MMM-FMI](https://github.com/mykle1/MMM-FMI) - Hide/Show Phone
* [MMM-Fortune](https://github.com/mykle1/MMM-Fortune) - Hide/Show Fortune
* [MMM-Gas](https://github.com/cowboysdude/MMM-Gas) - Hide/Show Gas
* [MMM-ISS](https://github.com/mykle1/MMM-ISS) - Hide/Show Station
* [MMM-JEOPARDY](https://github.com/mykle1/MMM-JEOPARDY) - Hide/Show Jeopardy
* [MMM-LICE](https://github.com/mykle1/MMM-LICE) - Hide/Show Lice
* [MMM-Lottery](https://github.com/mykle1/MMM-Lottery) - Hide/Show Lottery
* [MMM-Lunartic](https://github.com/mykle1/MMM-Lunartic) - Hide/Show Moon
* [MMM-MARS](https://github.com/mykle1/MMM-MARS) - Hide/Show Mars
* [MMM-NASA](https://github.com/mykle1/MMM-NASA) - Hide/Show Nasa
* [MMM-NOAA3](https://github.com/cowboysdude/MMM-NOAA3) - Hide/Show Weather
* [MMM-PC-Stats](https://github.com/mykle1/MMM-PC-Stats) - Hide/Show Stats
* [MMM-PetFinder](https://github.com/mykle1/MMM-PetFinder) - Hide/Show Pets
* [MMM-PilotWX](https://github.com/mykle1/MMM-PilotWX) - Hide/Show Pilots
* [MMM-SORT](https://github.com/mykle1/MMM-SORT) - Hide/Show Tides
* [MMM-SoundMachine](https://github.com/mykle1/MMM-SoundMachine) - Hide/Show SoundMachine
* [MMM-SunRiseSet](https://github.com/mykle1/MMM-SunRiseSet) - Hide/Show Sunrise
* [MMM-ToDoLive](https://github.com/mykle1/MMM-ToDoLive) - Hide/Show Reminder
* [MMM-History](https://github.com/cowboysdude/MMM-History) - Hide/Show History
* [MMM-Astro](https://github.com/cowboysdude/MMM-Astro) - Hide/Show Horoscope
* [MMM-DailyQuotes](https://github.com/cowboysdude/MMM-DailyQuotes) - Hide/Show Quote
* [MMM-Glock](https://github.com/cowboysdude/MMM-Glock) - Hide/Show Glock

### MagicMirror Default modules

* calendar - Hide/Show Calendar
* clock - Hide/Show Clock
* compliments - Hide/Show Compliments
* currentweather - Hide/Show Current
* newsfeed - Hide/Show Newsfeed
* weatherforecast - Hide/Show Forecast


## Any module and custom commands added by request

* Simply post your request in the MMM-VoiceCommander topic.
* Name the module and the custom command you would like.

## Troubleshooting issues with MotionDetection

Accessing your (web)cam requires to have the client run on localhost or a HTTPS host.
This is due to new requirements in Chrome for getUserMedia. The default value in your
MagicMirror config.js is already localhost so most users shouldn't be affected.
                
