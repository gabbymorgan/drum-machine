// create an array of frequencies corresponding to MIDI notes
let A = 440.0;
let midiNotes = [];
for (let i = 0; i < 127; i++) {
  midiNotes[i] = A * Math.pow(2, (i - 69) / 12);
}

// convert MIDI note to frequency
const midiToFreq = note => {
  return A * Math.pow(2, (note - 69) / 12);
};

// Create a buffer filled with Noise (random values between -1 and 1)
const noiseBuffer = context => {
  let bufferSize = context.sampleRate;
  let buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  let output = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  return buffer;
};

function generateIR(context, duration, decay) {
  let sampleRate = context.sampleRate;
  let length = sampleRate * duration;
  let impulse = context.createBuffer(2, length, sampleRate);
  let impulseL = impulse.getChannelData(0);
  let impulseR = impulse.getChannelData(1);

  if (!decay) decay = 2.0;
  for (let i = 0; i < length; i++) {
    impulseL[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
    impulseR[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, decay);
  }
  return impulse;
}

// Kick
function kick(context, destination) {
  const osc = context.createOscillator();
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  filter.frequency.value = 3000;

  // osc.type = 'sawtooth';
  osc.frequency.value = 100;
  osc.connect(filter);
  filter.connect(gain);

  gain.connect(destination);
  gain.gain.value = 0;

  osc.start(context.currentTime);

  osc.frequency.exponentialRampToValueAtTime(60, context.currentTime + 0.1);
  const LENGTH = 0.1;
  gain.gain.linearRampToValueAtTime(0.9, context.currentTime + 0.0001);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.9, 0.9, 0.8, 0.5, 0]),
    context.currentTime + 0.0001,
    LENGTH
  );
  osc.stop(context.currentTime + LENGTH + 0.1);
}

// Snare
function snare(context, destination) {
  const noise = context.createBufferSource();
  noise.buffer = noiseBuffer(context);
  const noiseGain = context.createGain();
  noiseGain.gain.value = 0.1;
  const filter = context.createBiquadFilter();
  filter.frequency.value = 8000;
  const gain = context.createGain();

  const osc = context.createOscillator();
  osc.frequency.value = 200;
  const oscGain = context.createGain();
  osc.connect(oscGain);
  oscGain.connect(gain);
  oscGain.gain.value = 0.4;

  noise.connect(noiseGain);
  noiseGain.connect(gain);

  gain.connect(filter);
  gain.gain.value = 0;
  filter.connect(destination);

  noise.start(context.currentTime);
  osc.start(context.currentTime);

  const LENGTH = 0.2;
  gain.gain.linearRampToValueAtTime(0.9, context.currentTime + 0.001);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.9, 0]),
    context.currentTime + 0.001,
    LENGTH
  );
}

// Tom 1
function tom1(context, destination) {
  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.type = 'sine';
  osc.frequency.value = 250;
  osc.connect(gain);

  gain.connect(destination);
  gain.gain.value = 0;

  osc.start(context.currentTime);

  const LENGTH = 0.1;
  gain.gain.linearRampToValueAtTime(0.9, context.currentTime + 0.001);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.9, 0]),
    context.currentTime + 0.001,
    LENGTH
  );
  osc.stop(context.currentTime + LENGTH + 0.1);
}

// Tom 2
function tom2(context, destination) {
  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.type = 'sine';
  osc.frequency.value = 150;
  osc.connect(gain);

  gain.connect(destination);
  gain.gain.value = 0;

  osc.start(context.currentTime);

  const LENGTH = 0.1;
  gain.gain.linearRampToValueAtTime(0.9, context.currentTime + 0.001);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.9, 0]),
    context.currentTime + 0.001,
    LENGTH
  );
  osc.stop(context.currentTime + LENGTH + 0.1);
}

// HH Open
function hhopen(context, destination) {
  const noise = context.createBufferSource();
  noise.buffer = noiseBuffer(context);
  const noiseGain = context.createGain();
  noiseGain.gain.value = 0.5;
  const filter = context.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2000;

  const osc = context.createOscillator();
  osc.frequency.value = 2000;
  const oscGain = context.createGain();
  oscGain.gain.value = 0.2;

  const gain = context.createGain();

  noise.connect(noiseGain);
  noiseGain.connect(gain);

  osc.connect(oscGain);
  oscGain.connect(gain);

  gain.connect(filter);
  gain.gain.value = 0;
  filter.connect(destination);

  noise.start(context.currentTime);
  osc.start(context.currentTime);

  const LENGTH = 0.5;
  gain.gain.linearRampToValueAtTime(0.2, context.currentTime + 0.001);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.2, 0]),
    context.currentTime + 0.001,
    LENGTH
  );
}

//HH Closed
function hhclosed(context, destination) {
  const noise = context.createBufferSource();
  noise.buffer = noiseBuffer(context);
  const noiseGain = context.createGain();
  noiseGain.gain.value = 0.5;
  const filter = context.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2000;

  const osc = context.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = 2000;
  const oscGain = context.createGain();
  oscGain.gain.value = 0.2;

  const gain = context.createGain();

  noise.connect(noiseGain);
  noiseGain.connect(gain);

  osc.connect(oscGain);
  oscGain.connect(gain);

  gain.connect(filter);
  gain.gain.value = 0;
  filter.connect(destination);

  noise.start(context.currentTime);
  osc.start(context.currentTime);

  const LENGTH = 0.1;
  gain.gain.linearRampToValueAtTime(0.2, context.currentTime + 0.001);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.2, 0]),
    context.currentTime + 0.001,
    LENGTH
  );
}

// Aux 1
function aux1(context, destination) {
  const osc = context.createOscillator();
  osc.type = 'sawtooth';
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  filter.connect(gain);

  // osc.type = '';
  let randomNote = (Math.random() * 30 + 30) | 0;
  osc.frequency.value = midiToFreq(randomNote);
  osc.frequency.linearRampToValueAtTime(
    midiToFreq(randomNote),
    context.currentTime + 0.1
  );

  osc.start(context.getCurrentTime);
  osc.connect(filter);
  gain.connect(destination);
  gain.gain.value = 0;

  const LENGTH = 2;
  gain.gain.linearRampToValueAtTime(0.2, context.currentTime + 0.2);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.2, 0]),
    context.currentTime + 0.2,
    LENGTH
  );
  osc.stop(context.currentTime + LENGTH + 0.4);
}

// Aux 2
function aux2(context, destination) {
  const osc = context.createOscillator();
  osc.type = 'sawtooth';
  const gain = context.createGain();
  const filter = context.createBiquadFilter();
  filter.connect(gain);

  let randomNote = (Math.random() * 30 + 50) | 0;
  osc.frequency.value = midiToFreq(randomNote);
  osc.frequency.linearRampToValueAtTime(
    midiToFreq(randomNote),
    context.currentTime + 0.1
  );
  osc.start(context.getCurrentTime);
  osc.connect(filter);
  gain.gain.value = 0;
  gain.connect(destination);

  const LENGTH = 2;
  gain.gain.linearRampToValueAtTime(0.2, context.currentTime + 0.2);
  gain.gain.setValueCurveAtTime(
    new Float32Array([0.2, 0]),
    context.currentTime + 0.2,
    LENGTH
  );
  osc.stop(context.currentTime + LENGTH + 0.4);
}

export { kick, snare, tom1, tom2, hhopen, hhclosed, aux1, aux2, generateIR };
