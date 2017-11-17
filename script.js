var xScreenSize = innerWidth-20;
var yScreenSize = innerHeight-20;
var stage = 0;
var walls = [];
var player_img;

function setup() {
  createCanvas(xScreenSize, yScreenSize);
  player_img = loadImage("images/pon.png");
  angleMode(RADIANS); // Change the mode to RADIANS for Math.sin() and Math.cos() witch use radians.
}

function wall(X,Y) {
  this.xPos = X;
  this.yPos = Y;
  this.health = 3;
  // hitbox bullets
  // render
  this.render = function() {
    rectMode(CENTER);
    fill(255);
    rect(this.xPos, this.yPos, 20, 20);
  }
}

walls = [new wall(150,150),new wall(160,160)];

function player() {
  this.xPos = 100;
  this.yPos = 100;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.direction = 0;
  this.health = 100;
  // controls
  this.controls = function() {
    if (keyIsDown(65)) { //a
      this.direction -= 0.05;
    }
    if (keyIsDown(68)) { //d
      this.direction += 0.05;
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
    this.xSpeed = this.xSpeed * 0.95;
    this.ySpeed = this.ySpeed * 0.95;
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
    rectMode(CENTER);
    rect(0, 0, 10, 10);
    stroke(255,0,0);
    line(0,0,0,50);
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
    var a = 0;
    while (a < walls.length) {
      walls[a].render();
      a += 1;
    }
    Player.render();
  }
}
