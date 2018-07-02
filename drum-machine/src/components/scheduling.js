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

  var buffer;

  // Public stuff

  // Plays audio file
  this.play = function(time) {
    var s = context.createBufferSource();
    s.buffer = this.buffer;
    s.connect(context.destination);

    s.start(time);
  };

  // Loads audio file
  this.load = function(url) {
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";

    req.onload = function() {
      context.decodeAudioData(req.response, function(buffer) {
        this.buffer = buffer;
      });
    };

    req.send();
  };
};

// Sequence object
var Sequence = function(subdivision, sample) {
  // Public shizz

  var seq;

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
    while (true) {
      this.play();
    }
  };

  this.stop = function() {
    stopped = true;
  };
};

/*

Sample use case

setBPM(120);
var kick = new Sample();
kick.load("./kick.wav");
var kickSequence = new Sequence(16, kick);
kickSequence.load([true, false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]);
kickSequence.loop();

*/
