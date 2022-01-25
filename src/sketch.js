
var radius = 0;

var theta = 0;
var dTheta = .01;

var signalX = 0;

var oldX;
var oldY;


var points = [];
var signals = [];

var addedSignals = [];

var itersSinceDraw = 0;

var sliderVal = 5;
var slider;

var dThetaSlider;




function setup() {

  createCanvas(800, 400);
  
  radius = width / 7;
  signalX = width / 3;
  
  
  signals = getSquareWave(3);
  slider = createSlider(0, 100, sliderVal, 1);
  dThetaSlider = createSlider(0, 0.02, dTheta, 0.001);
  textSize(32);
  
  document.getElementById("add_signal_button").addEventListener("click", function() {
    
    freq_input = document.getElementById("frequency_input");
    amp_input = document.getElementById("amplitude_input");

    if (freq_input.value && amp_input.value) {
      addSignal(freq_input.value, amp_input.value);
      freq_input.value = "";
      amp_input.value = "";
    }
    
    
}, false);
  
    document.getElementById("clear_added_signals").addEventListener("click", function() {
    
    addedSignals = [];
    
    
}, false);
  
  
  
}

function addSignal(freq, amp) {
  console.log(freq);
  console.log(amp);
  
  addedSignals.push(new Signal(amp, freq));
}


function getSquareWave(n) {
  
  let vals = [];
  for(let i = 1; i <= 2*n; i+=2) {
    vals.push(new Signal(1/i, i));
  }
  return vals;
  
}


function draw() {
  background(220);
  
  text(slider.value(), 10, 95/100*height, 100, 100);
  noFill();
  translate(width / 3, height / 2);
  
  x = 0;
  y = 0;
  fill(0);
  circle(x, y, 5);    
  
  if (sliderVal != slider.value()) {
    sliderVal = slider.value();
    text(slider.value(), 10, height +100);
    signals = getSquareWave(sliderVal);
  }
  
  dTheta = dThetaSlider.value();
  
  

  
  for(let i = 0; i < signals.length; i++) {
    
    let amplitude = signals[i].a;
    let frequency = signals[i].f;

    
    noFill();
    circle(x, y, 2*radius * amplitude);
    oldX = x;
    oldY = y;
    x = x + (radius * amplitude) * cos(frequency * theta);
    y = y + (radius * amplitude) * sin(frequency * theta);
    line(oldX, oldY, x, y);
    fill(0);
    circle(x, y, 5);
  }
  
    
  for(let i = 0; i < addedSignals.length; i++) {
    
    let amplitude = addedSignals[i].a;
    let frequency = addedSignals[i].f;

    
    noFill();
    circle(x, y, 2*radius * amplitude);
    oldX = x;
    oldY = y;
    x = x + (radius * amplitude) * cos(frequency * theta);
    y = y + (radius * amplitude) * sin(frequency * theta);
    line(oldX, oldY, x, y);
    fill(0);
    circle(x, y, 5);
  }
  
  
 
  
  line(x,y,signalX, y);
  
  
  
  itersSinceDraw += 1;
  if (itersSinceDraw > 1) {
    points.push(new Point(signalX, y));
    itersSinceDraw = 0;
  }

  

  
  for(let i = 0; i < points.length; i++) {
    points[i].update(dTheta);
    
    if (points[i].x + width / 3 > width) {
      points.splice(i, 1);
      i--;
    }
    
  }
  
  strokeWeight(3);
  for(let i = 0; i < points.length - 1; i++) {
    p1 = points[i];
    p2 = points[i+1];
    line(p1.x, p1.y, p2.x, p2.y);
  }
  
  let lastPoint = points[points.length - 1];
  
  if (lastPoint) {
    line(lastPoint.x, lastPoint.y, signalX, y);
  }
  

  strokeWeight(1);
  

  
  
  theta += dTheta;
  

}
