var xScreenSize = innerWidth - 4; // canvas size
var yScreenSize = innerHeight - 5;
var stage = 0; // 0 = ingame
var walls = []; // lsit with all wall objects
var aBullets = []; // list with all bullet objects
var player_img; // image of player
var barricade_img; // image for wall
var aantal_muren = 30; // aantal muren in het begin
var a = 0; // loop counter
var dx = 0; // disnatce X and Y used in many onjects in hitboxing
var dy = 0;
var reload = 0; // reload variable, if <= 0 player can fire
var cameraX = 0; // cameraX and Y, X and Y position of camera.
var cameraY = 0;
var i; // loop variable
var AXSpeed = 0; // average X and Y speed of player
var AYSpeed = 0;
var amount_of_walls_dis = 0;
var enemies = [];


function posit(a) {
  return(sqrt(a*a));
}

function isPosit(a) {
  return(a >= 0);
}

function setup() {
  // create random walls
  for (j = 0; j < aantal_muren; j++){
    walls[walls.length] = new wall(random(0 - xScreenSize/2, xScreenSize-20), random(0 - yScreenSize/2, yScreenSize-20), 20);
  }
  createCanvas(xScreenSize, yScreenSize);
  player_img = loadImage("images/pon.png");
  barricade_img = loadImage("images/barriecade.png");
  angleMode(RADIANS); // Change the mode to RADIANS for Math.sin() and Math.cos() witch use radians.
}

function create_walls(){
  i = 0;
  amount_of_walls_dis = 0;
  while (i < walls.length) {
    if ((walls[i].xPos - cameraX <= -xScreenSize*2) || (walls[i].xPos - cameraX >= xScreenSize + xScreenSize*2) || (walls[i].yPos - cameraY <= -yScreenSize*2) || (walls[i].yPos - cameraY >= yScreenSize + yScreenSize*2)){
      amount_of_walls_dis += 1;
      walls.splice(i, 1);
      i -= 1;
      randint = Math.floor(random(0,359));
      walls[walls.length] = new wall(Math.sin(randint) * 1000 + Player.xPos, Math.cos(randint) * 1000 + Player.yPos, 20);
    }
    if (amount_of_walls_dis > 0){
//      console.log(amount_of_walls_dis);
    }
    i += 1;
  }
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
    image(barricade_img, this.xPos - (size/2) - cameraX, this.yPos - (size/2) - cameraY, size, size);
  }
}


function bullet(X,Y,XS,YS,Damage, COL) {
  this.xPos = X;
  this.yPos = Y;
  this.ySpeed = XS;
  this.xSpeed = YS;
  this.Dam = Damage;
  this.age = 0;
  this.color = COL;
  this.tick = function() {
    //move
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
    // hitbox walls
    //hitbox enemys
    //hitbox player
    if (this.xPos - cameraX > xScreenSize + xScreenSize || this.xPos - cameraX < 0 - xScreenSize || this.yPos - cameraY > yScreenSize + yScreenSize || this.yPos - cameraY < 0 - yScreenSize){
      aBullets.splice(aBullets.indexOf(this), 1);
    }
    this.age += 1;
  }
  //render
  this.render = function() {
    fill(this.color);
    ellipse(this.xPos - cameraX,this.yPos - cameraY,this.Dam * 5,this.Dam * 5);
  }
}

function enemy(X, Y, HP, REL) {
  this.xPos = X;
  this.yPos = Y;
  this.health = HP;
  this.reload = REL;
  this.xSpeed = 0;
  this.ySpeed = 0;
  this.size = 30;
  this.ai = function() {
    dx = Player.xPos - this.xPos;
    dy = Player.yPos - this.yPos;
    this.xSpeed += Math.sin(Math.asin(dx / 10000)) * 100;
    this.ySpeed += Math.cos(Math.acos(dy / 10000)) * 100;
    this.xSpeed = this.xSpeed / 1.2;
    this.ySpeed = this.ySpeed / 1.2;
    a = 0;
    while (a < walls.length) {
      dx = walls[a].xPos - this.xPos;
      dy = walls[a].yPos - this.yPos;
//    Math.sqrt((dx*dx)+(dy*dy)) < ((walls[a].size / 2) + (70/2))
      if ((posit(dx) < ((walls[a].size / 2) + (70/2))) && (posit(dy) < ((walls[a].size / 2) + (this.size/2)))) {
        this.health -= 5;
        if (posit(dx) > posit(dy)) {
          if (!(isPosit(dx))) {
            this.xPos = walls[a].xPos + (walls[a].size / 2) + (this.size/2) + 1;
            this.xSpeed = 0;
            this.ySpeed = this.ySpeed / 5;
            this.rot += this.ySpeed / 10;
          } else {
            this.xPos = walls[a].xPos - (walls[a].size / 2) - (this.size/2) - 1;
            this.xSpeed = 0;
            this.ySpeed = this.ySpeed / 5;
            this.rot -= this.ySpeed / 10;
          }
        } else {
          if (!(isPosit(dy))) {
            this.yPos = walls[a].yPos + (walls[a].size / 2) + (this.size/2) + 1;
            this.ySpeed = 0;
            this.xSpeed = this.xSpeed / 5;
            this.rot -= this.xSpeed / 10;
          } else {
            this.yPos = walls[a].yPos - (walls[a].size / 2) - (this.size/2) - 1;
            this.ySpeed = 0;
            this.xSpeed = this.xSpeed / 5;
            this.rot += this.xSpeed / 10;
          }
        }
      }
      a += 1;
    }
    if (this.reload <= 0) {
      aBullets[aBullets.length] = new bullet(this.xPos, this.yPos, Math.sin(Player.rot + (Math.PI / 2)) * 20, Math.cos(Player.rot + (Math.PI / 2)) * 20, 2, [255, 255, 0]);
      this.reload = 50;
    }
    this.xPos += this.xSpeed;
    this.yPos += this.ySpeed;
    this.reload -= 1;
  }
  this.render = function() {
    fill(0,0,255,255);
    ellipse(this.xPos - cameraX,this.yPos - cameraY,this.size,this.size);
  }
}

enemies = [new enemy(0,0,1,50), new enemy(100,100,1,50)];

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
      dx = walls[a].xPos - this.xPos; // dx = distance X
      dy = walls[a].yPos - this.yPos;
      if ((posit(dx) < ((walls[a].size / 2) + (75/2))) && (posit(dy) < ((walls[a].size / 2) + (75/2)))) { // if collision
        this.health -= 5;
        if (posit(dx) > posit(dy)) { // check side of collision step 1
          if (!(isPosit(dx))) { // check side of collision step 2
            this.xPos = walls[a].xPos + (walls[a].size / 2) + (75/2); // do Xpos
            this.xSpeed = 0; // stop xspeed
            this.ySpeed = this.ySpeed / 5; // slow down y speed (friction)
            this.rot += this.ySpeed / 10; // roll against wall
          } else { //check side of collision step 2
            this.xPos = walls[a].xPos - (walls[a].size / 2) - (75/2);
            this.xSpeed = 0;
            this.ySpeed = this.ySpeed / 5;
            this.rot -= this.ySpeed / 10;
          }
        } else { // check side of collision step 1
          if (!(isPosit(dy))) { // check side of collision step 2
            this.yPos = walls[a].yPos + (walls[a].size / 2) + (75/2);
            this.ySpeed = 0;
            this.xSpeed = this.xSpeed / 5;
            this.rot -= this.xSpeed / 10;
          } else { // check side of collision step 2
            this.yPos = walls[a].yPos - (walls[a].size / 2) - (75/2);
            this.ySpeed = 0;
            this.xSpeed = this.xSpeed / 5;
            this.rot += this.xSpeed / 10;
          }
        }
      }
      a += 1;
    }
    this.xPos += this.xSpeed; // update xpos
    this.yPos += this.ySpeed;
    this.xSpeed = this.xSpeed * 0.95; // slow down slightly
    this.ySpeed = this.ySpeed * 0.95;
  }
  // hitboxing bullets
  // hitboxing enemys
  // render
  this.render = function() {
    translate(this.xPos - cameraX,this.yPos - cameraY); // rotation
    push(); // rotation
    rotate(this.rot); // rotation
    rectMode(CENTER); // image
    image(player_img, -37.5, -37.5, 75, 75); // image
    pop(); // rotation
  }
}

var Player = new player();

var count = 0;

function draw() {
  create_walls(); // wall algorithim
  if (stage == 0){ // unused
    background(0,0,25,255); // darkblue
    fill(0, 255, 0);
    noStroke();
    if (keyIsDown(32)) { // spacebar
      if (reload <= 0) {
        aBullets[aBullets.length] = new bullet(Player.xPos, Player.yPos, Math.sin(Player.rot + (Math.PI / 2)) * 20, Math.cos(Player.rot + (Math.PI / 2)) * 20, 2, [255, 0, 0]);
        reload = 50;
      }
    }
    if (keyIsDown(16) && keyIsDown(8)) { //shift + backspace
      if (reload <= 0) {
        aBullets[aBullets.length] = new bullet(Player.xPos, Player.yPos, Math.sin(Player.rot + (Math.PI / 2)) * 20, Math.cos(Player.rot + (Math.PI / 2)) * 20, 2, [0, 0, 255]);
        reload = 10;
      }
    }
    a = 0; // bullets tick
    while (a < aBullets.length) {
      aBullets[a].tick();
      a += 1;
    }
    a = 0; // enemies tick/AI
    while (a < enemies.length) {
      enemies[a].ai();
      a += 1;
    }
    Player.controls(); // player tick/controls
    AXSpeed = (Player.xSpeed + (AXSpeed * 3)) / 4; // average X speed of player, camera
    AYSpeed = (Player.ySpeed + (AYSpeed * 3)) / 4;
    cameraX = Player.xPos + (AXSpeed * 10) - (xScreenSize / 2); // camera is set ahead of player based on movement(speed)
    cameraY = Player.yPos + (AYSpeed * 10) - (yScreenSize / 2);
    a = 0; // wall render
    while (a < walls.length) {
      walls[a].render();
      a += 1;
    }
    a = 0; // enemies render
    while (a < enemies.length) {
      enemies[a].render();
      a += 1;
    }
    a = 0; // bullets render
    while (a < aBullets.length) {
      aBullets[a].render();
      a += 1;
    }
    Player.render(); // player renders on top
  }
  count += 1; // keep count of loop (now unused)
  reload -= 1; // reload cooldown, if < 0, the allow fire
}
