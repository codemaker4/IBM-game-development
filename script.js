var xScreenSize = innerWidth-20;
var yScreenSize = innerHeight-20;
var stage = 0;
var walls = [];
var player_img;
var barricade_img;
var a = 0;
var dx = 0;
var dy = 0;

function setup() {
  createCanvas(xScreenSize, yScreenSize);
  player_img = loadImage("images/pon.png");
  barricade_img = loadImage("images/barriecade.png");
  angleMode(RADIANS); // Change the mode to RADIANS for Math.sin() and Math.cos() witch use radians.
}

function wall(X,Y,size) {
  this.xPos = X;
  this.yPos = Y;
  this.size = size;
  this.health = 3;
  // hitbox bullets
  // render
  this.render = function() {
    rectMode(CENTER);
    fill(255);
    image(barricade_img, this.xPos - (size/2), this.yPos - (size/2), size, size);
  }
}

walls = [new wall(150,150,20), new wall(160,160,20), new wall(170,160,20), new wall(180,160,20)];

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
    a = 0;
    //hitboxing walls
    while (a < walls.length) {
      dx = walls[a].xPos - this.xPos;
      dy = walls[a].yPos - this.yPos;
      if (Math.sqrt((dx*dx)+(dy*dy)) < ((10) + (70/3))) {
        this.health -= 5;
        this.xSpeed += dx / -50;
        this.ySpeed += dy / -50;
      }
      a += 1;
    }
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
    this.xSpeed = this.xSpeed * 0.95;
    this.ySpeed = this.ySpeed * 0.95;
  }
  // hitboxing bullets
  // hitboxing enemys
  // render
  this.render = function() {
    fill(0,0,0); //color = black
    translate(this.xPos,this.yPos);
    push();
    rotate(this.direction);
    rectMode(CENTER);
    image(player_img, -37.5, -37.5, 75, 75);
    stroke(255,0,0);
    line(0,0,0,50);
    pop();
  }
}

var Player = new player();

var count = 0;

function draw() {
  if (stage == 0){
    background(100);
    fill(0, 255, 0);
    noStroke();
    Player.controls();
    a = 0;
    while (a < walls.length) {
      walls[a].render();
      a += 1;
    }
    Player.render();
  }
  count += 1;
}
