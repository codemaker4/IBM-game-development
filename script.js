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
  this.xPos = 100;
  this.yPos = 100;
  // controls
  this.controls = function() {
    if (keyIsDown(65)) { //a
      this.xPos-=5;
    }
    if (keyIsDown(68)) { //d
      this.xPos+=5;
    }
    if (keyIsDown(87)) { //w
      this.yPos-=5;
    }
    if (keyIsDown(83)) { //s
      this.yPos+=5;
    }
  }
  // hitboxing walls
  // hitboxing bullets
  // hitboxing enemys
  // render
  this.render = function() {
    fill(0,0,0); //color = black
    ellipse(this.xPos,this.yPos,5,5)
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
