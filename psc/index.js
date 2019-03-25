'use strict';

var spawn = require('child_process').spawn;
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var reservedEvents = {
  close: true,
  error: true,
  data: true,
  end: true,
  readable: true,
  drain: true,
  finish: true,
  pipe: true,
  unpipe: true
};
var pc=null;
var self;
function PocketSphinxContinuous(config)  {
	self=this;
  this.setId = config.setId;
  this.verbose = config.verbose;
  this.microphone = config.microphone;
	this.startListening= startListening;
	this.stopListening= stopListening;
	this.isListening= getStatus;
  if(config.autostart == undefined || config.autostart==true)
  {
    startListening()
  }
  EventEmitter.call(this);
}

function startListening(){  

  if(pc==null){
    pc = spawn('pocketsphinx_continuous', [
      '-adcdev',
      'plughw:' + self.microphone,
      '-inmic',
      'yes',
      '-lm',
      'modules/MMM-VoiceCommander/' + self.setId + '.lm',
      '-dict',
      'modules/MMM-VoiceCommander/' + self.setId + '.dic'
    ]);
    var psc = self;

    pc.stdout.on('data', function(data) {
      var output = data.toString().trim();
      if (output) {
        psc.emit('data', output);
      }
      // Also try to emit an event for the actual data, unless of course the
      // event is a reserved one.
      var eventName = output.toLowerCase();
      if (!reservedEvents[eventName]) {
        psc.emit(eventName, output)
      }
    });
    pc.stderr.on('data', function(data) {
      var output = data.toString().trim();
      if (config.verbose && output) {
        psc.emit('debug', data);
      }
    });
    pc.on('close', function(code) {
      psc.emit('error', code);
    });
    pc.on('error', function(err) {
      psc.emit('error', err);
    })
  }
}

function stopListening(){
    if(pc!=null){
      pc.kill();
      pc=null;
    }
        
}

function getStatus(){
    return pc!=null;  
}

util.inherits(PocketSphinxContinuous , EventEmitter);

module.exports = PocketSphinxContinuous;