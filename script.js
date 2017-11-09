var xScreenSize = innerWidth-20;
var yScreenSize = innerHeight-20;

function setup() {
  createCanvas(xScreenSize, yScreenSize);
}

function draw() {
  background(0);
  fill(0, 255, 0);
  noStroke();
  rect(xScreenSize/2-20, yScreenSize/2-20, 40, 40);
}
