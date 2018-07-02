window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var nextNotetime = audioContext.currentTime;
var clock = document.getElementById("clock");
var nextNote = document.getElementById("nextNote");
var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");
var timerID;

setInterval(function(){ clock.innerHTML = audioContext.currentTime; }, 500);

function playSound(time) {
  
  var osc = audioContext.createOscillator();
  osc.connect(audioContext.destination);
  osc.frequency.value = 200;
  osc.start(time);
  osc.stop(time + 0.1);
  
};

function scheduler() {

    while(nextNotetime < audioContext.currentTime + 0.1) {
        
        nextNotetime += 0.5;
        nextNote.innerHTML = nextNotetime;
        playSound(nextNotetime);
    }

   timerID = window.setTimeout(scheduler, 50.0);
}

startBtn.addEventListener('click', function() {

    scheduler();

  }, false);

stopBtn.addEventListener('click', function() {

    clearTimeout(timerID);

  }, false);

if(audioContext.state === 'suspended'){
  audioContext.resume();
};
