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
  // Private shizz

  var seq;

  // Public stuff

  // Play sequence
  this.play = function() {
    let currentTime = context.currentTime;

    for (let i = 0; i < subdivision; i++) {
      if (stopped) {
        stopped = false;
        break;
      }

      if (seq[i]) {
        sample.play(currentTime + bpm / 60 * i * (4 / subdivision));
      }
    }
  };

  // Load sequence
  this.load = function(arr) {
    seq = arr;
  };

  // Loops sequence until stop signal is sent
  this.loop = function() {
    window.setInterval(this.play(), bpm / 60 * 4);
  };

  this.stop = function() {
    stopped = true;
  };
};
