var xScreenSize = innerWidth-20;
var yScreenSize = innerHeight-20;
var stage = 0

function setup() {
  createCanvas(xScreenSize, yScreenSize);
}

function wall(X,Y) {
  this.xPos = X;
  this.yPos = Y;
  this.health = 3;
  // hitbox bullets
  // render
}

function player() {
  this.xPos = 0;
  this.yPos = 0;
  // controls
  // hitboxing walls
  // hitboxing bullets
  // hitboxing enemys
  // render
}

function draw() {
  if (stage == 0){
    background(0);
    fill(0, 255, 0);
    noStroke();
    rect(xScreenSize/2-20, yScreenSize/2-20, 40, 40);
    // loop walls
    // loop enemys
    // loop bullets
  }
}
