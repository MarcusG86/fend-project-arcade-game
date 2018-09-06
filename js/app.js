'use strict';

// Golbal Consts
const TILEHEIGHT = 83;
const TILEWIDTH = 100;
const XPOS = 200; // player pos on x axis
const YPOS = 390; // player pos on y axis

// Enemies our player must avoid
var Enemy = function(y) {
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.y = y;
  this.x = 0;
  this.sprite = 'images/enemy-bug.png';
  this.random = Math.floor(Math.random() * 3) + 1;
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
  // dt = time delta between ticks
  this.x = Math.round(this.x + (this.random + 1 * dt));

  if (this.x > 600) {
    this.x = 0;
    this.random = Math.floor(Math.random() * 3) + 1;
  }
  this.checkCollision();
};

Enemy.prototype.checkCollision = function() {
  if (
    player.y + 131 >= this.y + 90 && player.x + 25 <= this.x + 88 && player.y + 73 <= this.y + 135 &&
    player.x + 76 >= this.x + 11) {
    player.x = XPOS;
    player.y = YPOS;
  }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player Class
let Player = function(x, y) {
  // Starting pos
  this.x = XPOS;
  this.y = YPOS;
  this.sprite = 'images/char-horn-girl.png';
};

// a render() method
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// a update() method
Player.prototype.update = function() {

};

// a handleInput() method to keep player from
// moving off screen
Player.prototype.handleInput = function(kc) {
  if (kc === 'left' && this.x > 0) {
    this.x = this.x - TILEWIDTH;
  }
  if (kc === 'right' && this.x < 400) {
    this.x = this.x + TILEWIDTH;
  }
  if (kc === 'up' && this.y > 0) {
    this.y = this.y - TILEHEIGHT;
  }
  if (kc === 'down' && this.y < 400) {
    this.y = this.y + TILEHEIGHT;
  }
  // Sets player back to start when reaching water tile
  if (this.y + 3 <= 0) {
    this.x = XPOS;
    this.y = YPOS;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(70), new Enemy(140), new Enemy(210)];
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

// Added keys for WASD movement
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'left', // a
    87: 'up', // w
    68: 'right', // d
    83: 'down' // s
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
