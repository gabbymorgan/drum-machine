var bpm;
var context = new AudioContext();
var stopped = false;

//sets bpm
function setBPM(newBPM) {
  bpm = newBPM;
}

// Sample object
var Sample = function() {
  // Private properties

  var soundBuffer = null;

  // Public stuff

  // Plays audio file
  this.play = function(time) {
    stopped = false;
    var s = context.createBufferSource();
    s.buffer = soundBuffer;
    s.connect(context.destination);

    s.start(time);
  };

  // Loads audio file
  this.load = function(url) {
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";

    req.onload = function() {
      context.decodeAudioData(req.response, function(abuffer) {
        soundBuffer = abuffer;
      });
    };

    req.send();
  };
};

// Sequence object
var Sequence = function(subdivision, sample) {
  // Public shizz

  var seq;
  var interval;

  // Private stuff

  // Play sequence
  this.play = function() {
    let currentTime = context.currentTime;

    for (let i = 0; i < subdivision; i++) {
      if (stopped) {
        stopped = false;
        break;
      }

      if (seq[i]) {
        sample.play(currentTime + bpm / 60 * i * (2 / subdivision));
      }
    }
    console.log("Played");
  };

  // Load sequence
  this.load = function(arr) {
    seq = arr;
  };

  // Loops sequence until stop signal is sent
  this.loop = function() {
    // still working out loop time
    let totalTime = bpm / 60 * subdivision * (2 / subdivision) * 1000;
    this.play();
    interval = window.setInterval(this.play, totalTime);
  };

  this.stop = function() {
    stopped = true;
    window.clearInterval(interval);
  };
};

var Song = function(numTracks) {
  var sequences = [];

  for (let i = 0; i < numTracks; i++) {
    sequences.push([]);
  }

  this.addSequence = function(channel, sequence) {
    sequences[channel].push(sequence);
  };
};
