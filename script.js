var xScreenSize = innerWidth-20;
var yScreenSize = innerHeight-20;
var stage = 0;
var walls = [];
var aBullets = [];
var player_img;
var barricade_img;
var a = 0;
var dx = 0;
var dy = 0;
var reload = 0;

function posit(a) {
  return(sqrt(a*a));
}

function isPosit(a) {
  return(a >= 0);
}

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
  // hitbox aBullets
  // render
  this.render = function() {
    rectMode(CENTER);
    fill(255);
    image(barricade_img, this.xPos - (size/2), this.yPos - (size/2), size, size);
  }
}

walls = [new wall(150,150,20), new wall(160,160,20), new wall(170,160,20), new wall(180,160,20)];

function bullet(X,Y,Rotation,Damage) {
  this.xPos = X;
  this.yPos = Y;
  this.rot = Rotation;
  this.Dam = Damage;
  this.age = 0;
  this.tick = function() {
    //move
    this.xPos -= Math.sin(this.rot) * 5;
    this.yPos += Math.cos(this.rot) * 5;
    // hitbox walls
    //hitbox enemys
    //hitbox player
    if (this.xPos > xScreenSize || this.xPos < 0 || this.yPos > yScreenSize || this.yPos < 0){
      aBullets.splice(aBullets.indexOf(this), 1);
    }
    this.age += 1;
  }
  //render
  this.render = function() {
    fill(255,0,0);
    ellipse(this.xPos,this.yPos,this.Dam,this.Dam);
  }
}

function player() {
  this.xPos = 100;
  this.yPos = 100;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.rot = 0;
  this.health = 100;
  // controls
  this.controls = function() {
    if (keyIsDown(65)) { //a
      this.rot -= 0.05;
    }
    if (keyIsDown(68)) { //d
      this.rot += 0.05;
    }
    if (keyIsDown(87)) { //w
      this.xSpeed -= Math.sin(this.rot);
      this.ySpeed += Math.cos(this.rot);
    }
    if (keyIsDown(83)) { //s
      this.xSpeed += Math.sin(this.rot);
      this.ySpeed -= Math.cos(this.rot);
    }
    a = 0;
    //hitboxing walls
    while (a < walls.length) {
      dx = walls[a].xPos - this.xPos;
      dy = walls[a].yPos - this.yPos;
//    Math.sqrt((dx*dx)+(dy*dy)) < ((walls[a].size / 2) + (70/2))
      if ((posit(dx) < ((walls[a].size / 2) + (70/2))) && (posit(dy) < ((walls[a].size / 2) + (70/2)))) {
        this.health -= 5;
        if (posit(dx) > posit(dy)) {
          if (!(isPosit(dx))) {
            this.xPos = walls[a].xPos + (walls[a].size / 2) + (70/2);
            this.xSpeed = 0;
          } else {
            this.xPos = walls[a].xPos - (walls[a].size / 2) - (70/2);
            this.xSpeed = 0;
          }
        } else {
          if (!(isPosit(dy))) {
            this.yPos = walls[a].yPos + (walls[a].size / 2) + (70/2);
            this.ySpeed = 0;
          } else {
            this.yPos = walls[a].yPos - (walls[a].size / 2) - (70/2);
            this.ySpeed = 0;
          }
        }
      }
      a += 1;
    }
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
    this.xSpeed = this.xSpeed * 0.95;
    this.ySpeed = this.ySpeed * 0.95;
  }
  // hitboxing aBullets
  // hitboxing enemys
  // render
  this.render = function() {
    fill(0,0,0); //color = black
    translate(this.xPos,this.yPos);
    push();
    rotate(this.rot);
    rectMode(CENTER);
    image(player_img, -37.5, -37.5, 75, 75);
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
    if (keyIsDown(32)) { //s
      if (reload <= 0) {
        aBullets[aBullets.length] = new bullet(Player.xPos, Player.yPos, Player.rot, 4);
        reload = 50;
      }
    }
    a = 0;
    while (a < aBullets.length) {
      aBullets[a].tick();
      a += 1;
    }
    Player.controls();
    a = 0;
    while (a < walls.length) {
      walls[a].render();
      a += 1;
    }
    a = 0;
    while (a < aBullets.length) {
      aBullets[a].render();
      a += 1;
    }
    Player.render();
  }
  count += 1;
  reload -= 1;
}
