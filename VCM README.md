# MMM-VoiceCommander

* Control other modules that use voice commands with a single microphone.

* Built in motion detection for webcams. Puts your display to sleep or wakes it up.

* Built in support for sound files for audio responses.

* Hide and show pages of modules.

* Hide and show individual modules.

* No modification of other modules necessary.

* Offline by default. Online by controlling other modules. (Ex. AssistantMk2)


## Thanks go to . . .

* @sdetweil added crucial microphone release functionality to the module.
* @Mykle1's original pages and hide/show commands were improved upon and custom sound support.
* @cowboysdude for the "sentences" array and consultations on Skype.

## Inspirations

* MMM-voice by Strawberry 3.141
* motiondetector, camera by alexyak
* Hello-Lucy by Mykle1

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
      keyword: 'HELLO LUCY', // must use capital letters
      microphone: 0, // Please set correct microphone from the cat output after installation
      activateMotion: false, // true if you have a webcam and want motion detection
      standByMethod: 'DPMS', // 
      sounds: ["female_hi.wav"], // add sound files (comma separated) for random greetings
      startHideAll: true, // hides all modules at startup EXCEPT mainPageModules
          mainPageModules: ["MMM-VoiceCCommander"], // add modules in quotes and comma separated 
          pageTwoModules: [],     // add modules in quotes and comma separated 
          pageThreeModules: [],   // add modules in quotes and comma separated
          pageFourModules: [],    // add modules in quotes and comma separated
          pageFiveModules: [],    // add modules in quotes and comma separated
          pageSixModules: [],     // add modules in quotes and comma separated
          pageSevenModules: [],   // add modules in quotes and comma separated
          pageEightModules: [],   // add modules in quotes and comma separated
          pageNineModules: [],    // add modules in quotes and comma separated
          pageTenModules: [],     // add modules in quotes and comma separated
           }
    },

## Default modules and their commands

### [MMM-VoiceCommander](https://github.com/TheStigh/MMM-VoiceCommander)

* Hello Lucy (Replace Hello Lucy with your keyword)
* Go Online (Must have MMM-AssistantMk2 installed)
* Activate Assistant (Must have MMM-AssistantMk2 installed)
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
* Show Camera
* Hide Camera
* Selfie
                       
### [MMM-WindyV2](https://github.com/TheStigh/MMM-WindyV2)

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

### Hide/Show Default Modules

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

* Simply post your reqest in the MMM-VoiceCommander topic.
* Name the module and the custom command you would like.
                
