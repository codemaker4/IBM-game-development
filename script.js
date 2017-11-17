var xScreenSize = innerWidth-20;
var yScreenSize = innerHeight-20;
var stage = 0

function setup() {
  createCanvas(xScreenSize, yScreenSize);
  angleMode(RADIANS); // Change the mode to RADIANS for Math.sin() and Math.cos() witch use radians.
}

function wall(X,Y) {
  this.xPos = X;
  this.yPos = Y;
  this.health = 3;
  // hitbox bullets
  // render
}

function player() {
  this.xPos = 100;
  this.yPos = 100;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.direction = 0;
  // controls
  this.controls = function() {
    if (keyIsDown(65)) { //a
      this.direction -= 0.1;
    }
    if (keyIsDown(68)) { //d
      this.direction += 0.1;
    }
    if (keyIsDown(87)) { //w
      this.xSpeed -= Math.sin(this.direction);
      this.ySpeed += Math.cos(this.direction);
    }
    if (keyIsDown(83)) { //s
      this.xSpeed += Math.sin(this.direction);
      this.ySpeed -= Math.cos(this.direction);
    }
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
    this.xSpeed = this.xSpeed * 0.9;
    this.ySpeed = this.ySpeed * 0.9;
  }
  // hitboxing walls
  // hitboxing bullets
  // hitboxing enemys
  // render
  this.render = function() {
    fill(0,0,0); //color = black
    translate(this.xPos,this.yPos);
    push();
    rotate(this.direction);
    rect(-5, -5, 10, 10);
    pop();
  }
}

var Player = new player();

function draw() {
  if (stage == 0){
    background(100);
    fill(0, 255, 0);
    noStroke();
    Player.controls();
    Player.render();
  }
}
