/**
 * @file MMM-VoiceCommander.js @see  https://github.com/TheStigh/MMM-VoiceCommander
 *
 * @originalModule fewieden MMM-voice
 * @inspirationalModules Hello-Lucy MMM-ModuleToggle MMM-Hotword MMM-AssistantMk2 MMM-MotionDetector
 * @extended by TheStigh, Mykle1, cowboysdude and Sdetweil
 *
 * @license MIT
 *
 * @external Module   @see https://github.com/MichMich/MagicMirror/blob/master/js/module.js
 * @external Log      @see https://github.com/MichMich/MagicMirror/blob/master/js/logger.js
 * @external MM 	  @see https://github.com/MichMich/MagicMirror/blob/master/js/main.js
 *
 * @module MMM-VoiceCommander
 *
 * @requires external:Module, Log and MM
 */

 ////////////////////////////////////////////////////

'use strict';

var importedSentences;                              /** Prepare variable to be populated from import. */
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
readTextFile("modules/MMM-VoiceCommander/sentences.json", function(text){
    var tempImport = JSON.parse(text);
    importedSentences = tempImport;
    console.log('SENTENCE: '+importedSentences);
});

////////////////////////////////////////////////////

Module.register('MMM-VoiceCommander', {

    
    icon: 'fa-microphone-slash',                    /** @member {string} icon - Microphone icon. */
    pulsing: true,                                  /** @member {boolean} pulsing - Flag to indicate listening state. */
    help: false,                                    /** @member {boolean} help - Flag to switch between render help or not. */
	timeout: null,                                  /** Done by @sdetweil to release mic from PocketSphinx */
    	
    voice: {                                        /** @member {Object} voice - Defines the default mode and commands of this module. */
	mode: 'VOICE',                                  /** @property {string} mode - Voice mode of this module. */
	sentences: []                                   /** @property {string[]} sentences - List of voice commands of this module. */
    },

    modules: [],                                    /** @member {Object[]} modules - Set of all modules with mode and commands. */
    previouslyHidden: [],                           /** @member - keep list of modules already hidden when sleep occurs */

    defaults: {
        timeout: 10,                                // timeout listening for a command/sentence
        defaultOnStartup: 'MMM-VoiceCommander',     // keep this so this module always are present on MM
        keyword: 'HELLO LUCY',                      // keyword to activate listening for a command/sentence
        debug: false,                               // get debug information in console
        standByMethod: 'DPMS',                      // 'DPMS' = anything else than RPi or 'PI'
		sounds: ["female_hi.wav"],                  // welcomesound at startup, add several for a random choice of welcome sound
        startHideAll: true,                         // if true, all modules start as hidden
        microphone: 0,                              // Please set correct microphone from the cat output after installation
        speed: 1000,                                // transition speed between show/no-show/show in milliseconds
        activateMotion: false,                      // if true, webcam will be used to activate/deactivate MM on movement
        onlyHotword: false,                         // TBA - Hotword only to activate external module by sendNotification
        timeoutSeconds: 10,                         // seconds to wait for external module to confirm control of mic
		captureIntervalTime: 1000,                  // how often should the webcam check for motion, in milliseconds, default 1 second
        scoreThreshold: 20,                         // threshold to assume motion/no-motion -> se console log for score
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
    },

    lastTimeMotionDetected: null,
    poweredOff: false,

    getScripts: function() {
        return ['diff-cam-engine.js'];
    },

    /**
     * @function start
     * @description Sets mode to initialising.
     * @override
     */
    start() {
        var combinedSentences = importedSentences.concat(this.voice.sentences);
        this.voice.sentences = combinedSentences;
        Log.info(`Starting module: ${this.name}`);
        this.mode = this.translate('INIT');
        this.modules.push(this.voice);
        this.sendSocketNotification('RESTORE_MIC',this.config.muteNormalLevel);
        Log.info(`${this.name} is waiting for voice command registrations.`);

		if (this.config.activateMotion) {
			Log.info('DETECTOR: starting up');
			console.log('DETECTOR starter');
			this.lastTimeMotionDetected = new Date();
			this.sendNotification('ACTIVATE_MONITOR');
			console.log('DETECTOR started, sendt melding om å skru på skjerm');

			let _this = this;
			let canvas = document.createElement('canvas');
			let video = document.createElement('video');
			let cameraPreview = document.createElement('div');
			cameraPreview.id = 'cameraPreview';
			cameraPreview.style = 'visibility:hidden;';
			cameraPreview.appendChild(video);

			DiffCamEngine.init({
				video: video,
				captureIntervalTime: _this.config.captureIntervalTime,
				motionCanvas: canvas,
				initSuccessCallback: function () {
					DiffCamEngine.start();
				},
				initErrorCallback: function () {
					const warning = 'DETECTOR: error init cam engine';
					Log.warn(warning);
					console.log(warning);
				},
				captureCallback: function(payload) {
					const score = payload.score;	
                    if (score > _this.config.muteThreshold) {
                        Log.info('<<<>>> Muting volume!!');
                        _this.sendSocketNotification('MUTE_MIC',_this.config.muteVolumeLevel);
                            setTimeout(function(){ 
                                Log.info('<<<>>> Restoring volume!!');
                                _this.sendSocketNotification('RESTORE_MIC',_this.config.muteNormalLevel);
                            }, _this.config.muteTimer);
                    }
                    
                    else if (score < _this.config.muteThreshold && score > _this.config.scoreThreshold) {
						_this.lastTimeMotionDetected = new Date();
						if (_this.poweredOff) {
							_this.poweredOff = false;
							_this.sendSocketNotification('ACTIVATE_MONITOR');
							console.log('MOTION DETECTED, turning monitor on!');
						}
                    }

					else {
						const currentDate = new Date(),
							time = currentDate.getTime() - _this.lastTimeMotionDetected;
						if ((time > _this.config.timeoutMotion) && (!_this.poweredOff)) {
							_this.sendSocketNotification('DEACTIVATE_MONITOR');						
							_this.poweredOff = true;
						}
					}
					const info = 'DETECTOR: score ' + score;
					Log.info(info);
					console.info(info);
				}
			});
		}
    },

    getStyles() {
        return ['font-awesome.css', 'MMM-VoiceCommander.css'];
    },

    getTranslations() {
        return {
            en: 'translations/en.json',
            de: 'translations/de.json',
            id: 'translations/id.json'
        };
    },

    getDom() {
        const wrapper = document.createElement('div');
        const voice = document.createElement('div');
        voice.classList.add('small', 'align-left');

        const icon = document.createElement('i');
        icon.classList.add('fa', this.icon, 'icon');
        if (this.pulsing) {
            icon.classList.add('pulse');
        }
        voice.appendChild(icon);

        const modeSpan = document.createElement('span');
        modeSpan.innerHTML = this.mode;
        voice.appendChild(modeSpan);
        if (this.config.debug) {
            const debug = document.createElement('div');
            debug.innerHTML = this.debugInformation;
            voice.appendChild(debug);
        }

        const modules = document.querySelectorAll('.module');
        for (let i = 0; i < modules.length; i += 1) {
            if (!modules[i].classList.contains(this.name)) {
                if (this.help) {
                    modules[i].classList.add(`${this.name}-blur`);
                } else {
                    modules[i].classList.remove(`${this.name}-blur`);
                }
            }
        }
////////////////////////////////////////////////////////////////////////		
////////////////		Edit help screen to fit			//////////////// 
////////////////		all commands TO DO @ Mykle1		////////////////
////////////////////////////////////////////////////////////////////////

        if (this.help) {
            voice.classList.add(`${this.name}-blur`);
            const modal = document.createElement('div');
            modal.classList.add('modal');
            this.appendHelp(modal);
            wrapper.appendChild(modal);
        }

        wrapper.appendChild(voice);

        return wrapper;
    },
////////////////////////////////// EOC /////////////////////////////////

    notificationReceived(notification, payload, sender) {
        var self=this;
		if (notification === 'DOM_OBJECTS_CREATED') {
            this.sendSocketNotification('START', { config: this.config, modules: this.modules });
        } else if (notification === 'REGISTER_VOICE_MODULE') {
            if (Object.prototype.hasOwnProperty.call(payload, 'mode') && Object.prototype.hasOwnProperty.call(payload, 'sentences')) {
                this.modules.push(payload);
            }

////////////////////////////////////////////////////////////////////////
//////////////// 		Done by @sdetweil to			////////////////
//////////////// 	release mic from PocketSphinx		////////////////
//////////////// 	and create timer and checking		////////////////
////////////////////////////////////////////////////////////////////////

		// add handlers for notifications from other modules
        // did some other module  say they were done with the mic
        } else if(notification === 'HOTWORD_RESUME'){
            console.log("HOTWORD_RESUME received from "+(sender!=null?sender.name:"unknown"))
            console.log("HOTWORD_RESUME timeout value = "+this.timeout)
            if( this.timeout!=null){
				console.log("HOTWORD_RESUME clearing timeout handle")
				clearTimeout( this.timeout);
				this.timeout=null;
            }
				this.icon = 'fa-microphone';
				this.pulsing=false;
  //           	Log.error("resume updatedom")
				this.updateDom(100);
				this.sendSocketNotification('RESUME_LISTENING');
        // did some other module request the mic?
        // this could also be a confirm using the mic from the other module
        } else if(notification === 'HOTWORD_PAUSE'){ 
            console.log("HOTWORD_PAUSE received from "+(sender!=null?sender.name:"unknown"))
            console.log("HOTWORD_PAUSE timeout value = "+this.timeout)
            if( this.timeout!=null){
				console.log("HOTWORD_ PAUSE clearing timeout handle")
				clearTimeout( this.timeout);
				this.timeout=null;
            }        
				this.icon='fa-microphone-slash'
				this.pulsing=false;
				//Log.error("pause updatedom")
				this.updateDom(100);
				// if we send the suspend and already not listening, all is ok
				this.sendSocketNotification('SUSPEND_LISTENING');
        }

////////////////////////////////////////////////////////////////////////
//////////////// 	   	   Enhanced by @Mykle1	 		////////////////
//////////////// 		  to play startup sounds 		////////////////
////////////////////////////////////////////////////////////////////////

		if (notification === 'DOM_OBJECTS_CREATED') {
				 var audio_files = this.config.sounds;
				 var random_file = audio_files[Math.floor(Math.random() * audio_files.length)];
				 var audio = new Audio(random_file);
				 audio.src = 'modules/MMM-VoiceCommander/sounds/'+random_file;
				 audio.play();
				}
			  
////////////////////////////////////////////////////////////////////////
////////////////	 	   Enhanced by @TheStigh		////////////////
//////////////// 		   to manage hide/show 		    ////////////////
//////////////// 		    modules on startup 			////////////////
////////////////////////////////////////////////////////////////////////

		if (this.config.startHideAll) {
			if (notification === 'DOM_OBJECTS_CREATED') {
				MM.getModules().enumerate((module) => {
				module.hide(1000);
				});
			}
		}

       if (notification === 'DOM_OBJECTS_CREATED'){
			var showOnStart = MM.getModules().withClass(self.config.mainPageModules);
            
            showOnStart.enumerate(function(module) {
                var callback = function(){};
                module.show(self.config.speed, callback);
				});
        }
        
        if (notification === 'DOM_OBJECTS_CREATED'){
			var showOnStart = MM.getModules().withClass(self.config.defaultOnStartup);
            
            showOnStart.enumerate(function(module) {
                var callback = function(){};
                module.show(self.config.speed, callback);
				});
		}

////////////////////////////////////////////////////////////////////////
//////////////// 	   	Enhanced by @ & @THeStigh 		////////////////
//////////////// 		to show page one on alert 		////////////////
////////////////////////////////////////////////////////////////////////

		if (notification === 'SHOW_ALERT') {
            var showOnStart = MM.getModules().withClass(self.config.mainPageModules);
            showOnStart.enumerate(function(module) {
                var callback = function(){};
                module.show(self.config.speed, callback);
				});
			}

////////////////////////////////////////////////////////////////////////
//////////////// 	   	   Enhanced by @TheStigh 		////////////////
//////////////// 		receive activate/deactivate		////////////////
//////////////// 		 from MMM-MotionDetector		////////////////
////////////////////////////////////////////////////////////////////////

		if (notification === 'DEACTIVATE_MONITOR') {
			this.sendSocketNotification('DEACTIVATE_MONITOR');
			}

		if (notification === 'ACTIVATE_MONITOR') {
			this.sendSocketNotification('DEACTIVATE_MONITOR');
            }
            
//        if (notification === 'ALEXA_TOKEN_SET') {
//                setTimeout(() => {
//                     this.sendNotification('ALEXA_START_RECORDING', {});
//                }, 500);
//            }
	},

////////////////////////////////// EOC /////////////////////////////////

    socketNotificationReceived(notification, payload) {
        if (notification === 'READY') {
            //console.log(MMM-AssistantMk2.config.startChime);
            this.icon = 'fa-microphone';
            this.mode = this.translate('NO_MODE')+this.config.keyword;
            this.pulsing = false;
			
        } else if (notification === 'LISTENING') {
            this.pulsing = true;

        } else if (notification === 'SLEEPING') {
            this.pulsing = false;

        } else if (notification === 'ERROR') {
            this.mode = notification;

        } else if (notification === 'VOICE') {
            for (let i = 0; i < this.modules.length; i += 1) {
                if (payload.mode === this.modules[i].mode) {
                    if (this.mode !== payload.mode) {
                        this.help = false;
                        this.sendNotification(`${notification}_MODE_CHANGED`, { old: this.mode, new: payload.mode });
                        this.mode = payload.mode;
						}
                    if (this.mode !== 'VOICE') {
                        this.sendNotification(`${notification}_${payload.mode}`, payload.sentence);
						}
                    break;
                }
			}

////////////////////////////////////////////////////////////////////////
//////////////// 		Done by @sdetweil to			////////////////
//////////////// 	release mic from PocketSphinx		////////////////
//////////////// 	and create timer and checking		////////////////
////////////////////////////////////////////////////////////////////////

		/// new handler for detected 'go online' in node_helper
        } else if (notification === 'SUSPENDED') {
            this.icon='fa-microphone-slash'
            this.pulsing = false;
            this.debugInformation=" ";
            this.updateDom(100);

		// tell other module to resume voice detection
            this.timeout=setTimeout(() => {                        // dummy code here for response from other module when done
                    Log.log("mic suspend timeout,  sending socket notification to RESUME_LISTENING")
                    this.notificationReceived('HOTWORD_RESUME');
                }, this.config.timeoutSeconds*1000);         
            this.sendNotification('ASSISTANT_ACTIVATE', {profile:'default'});

////////////////////////////////// EOC /////////////////////////////////			

		} else if (notification === 'HIDE_MODULES') {
            MM.getModules().enumerate((module) => {
                module.hide(1000);
            });
        
		} else if (notification === 'SHOW_MODULES') {
            MM.getModules().enumerate((module) => {
                module.show(1000);
            });
			
        } else if (notification === 'DEBUG') {
            this.debugInformation = payload;
            
////////////////////////////////////////////////////////////////////////
/////////////// 	   	  Enhanced by @TheStigh to		////////////////
///////////////			show/hide by core messages 		////////////////
///////////////		 	either by single module- or 	////////////////
///////////////	      PAGE commands from node_helper	////////////////
////////////////////////////////////////////////////////////////////////

		} else if (notification === "MODULE_STATUS") {
			//console.log("Beskjed mottatt");
            //console.log("Beskjed var:"+payload.show);
            //Log.error(self.name + " received a module notification: " + notification);
			var hide = MM.getModules().withClass(payload.hide);
			hide.enumerate(function(module) {
				Log.log("Hide "+ module.name);
				var callback = function(){};
				//var options = {lockString: self.identifier};
				module.hide(self.config.speed, callback);
			});
            
			var show = MM.getModules().withClass(payload.show);
			show.enumerate(function(module) {
				Log.log("Show "+ module.name);
				var callback = function(){};
				//var options = {lockString: self.identifier};
				module.show(self.config.speed, callback);
			});
        
        } else if (notification === "MODULE_UPDATE") {
            this.sendNotification(payload);
            console.log('sendNoti received :'+payload);
        
////////////////////////////////// EOC //////////////////////////////////

        }
        this.updateDom(300);
    },

    
    /** @function appendHelp @description Creates the UI for the voice command SHOW HELP. */
    /** @param {Element} appendTo - DOM Element where the UI gets appended as child. */
     
    appendHelp(appendTo) {
        const title = document.createElement('h1');
        title.classList.add('xsmall'); // was medium @ Mykle
        title.innerHTML = `${this.name} - ${this.translate('COMMAND_LIST')}`;
        appendTo.appendChild(title);

        const mode = document.createElement('div');
    mode.classList.add('xsmall'); // added @ Mykle
        mode.innerHTML = `${this.translate('MODE')}: ${this.voice.mode}`;
        appendTo.appendChild(mode);

        const listLabel = document.createElement('div');
    listLabel.classList.add('xsmall'); // added @ Mykle
        listLabel.innerHTML = `${this.translate('VOICE_COMMANDS')}:`;
        appendTo.appendChild(listLabel);

        const list = document.createElement('ul');
        for (let i = 0; i < this.voice.sentences.length; i += 1) {
            const item = document.createElement('li');
      list.classList.add('xsmall'); // added @ Mykle
            item.innerHTML = this.voice.sentences[i];
            list.appendChild(item);
        }
        appendTo.appendChild(list);
    }
});
