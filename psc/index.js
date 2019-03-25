const spawn = require('child_process').spawn;
const EventEmitter = require('events').EventEmitter;
const util = require('util');

const reservedEvents = {
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

function PocketSphinxContinuous(config) {
  this.setId = config.setId;
  this.verbose = config.verbose;
  this.microphone = config.microphone;
  this.autostart = config.autostart;

  if (!config.hasOwnProperty('autostart') || config.autostart === true) {
    this.start();
  }

  EventEmitter.call(this);
}

PocketSphinxContinuous.prototype.start = function() {
  if (!this.isListening()) {
    this._psc = spawn('pocketsphinx_continuous', [
      '-adcdev',
      `plughw:${this.microphone}`,
      '-inmic',
      'yes',
      '-lm',
      `modules/${this.setId}/${this.setId}.lm`,
      '-dict',
      `modules/${this.setId}/${this.setId}.dic`
    ]);

    this._psc.stdout.on('data', data => {
      const output = data.toString().trim();
      if (output) {
        this.emit('data', output);
      }
      // Also try to emit an event for the actual data, unless of course the
      // event is a reserved one.
      const eventName = output.toLowerCase();
      if (!reservedEvents[eventName]) {
        this.emit(eventName, output);
      }
    });

    this._psc.stderr.on('data', data => {
      const output = data.toString().trim();
      if (this.verbose && output) {
        this.emit('debug', data);
      }
    });

    this._psc.on('close', code => {
      this.emit('error', code);
    });

    this._psc.on('error', err => {
      this.emit('error', err);
    });
  }
};

PocketSphinxContinuous.prototype.stop = function() {
  if (this.isListening()) {
    this._psc.kill();
  }
};

PocketSphinxContinuous.prototype.isListening = function() {
  return this._psc && !this._psc.killed;
};

util.inherits(PocketSphinxContinuous, EventEmitter);

module.exports = PocketSphinxContinuous;