var xScreenSize = innerWidth-20;
var yScreenSize = innerHeight-20;
var stage = 0

function setup() {
  createCanvas(xScreenSize, yScreenSize);
}

function draw() {
  if (stage == 0){
    background(0);
    fill(0, 255, 0);
    noStroke();
    rect(xScreenSize/2-20, yScreenSize/2-20, 40, 40);
  }
}
