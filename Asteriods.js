// Coded 01/2025 by Paul DeFrain so I might have something to put on GitHub as an example.
// Most of what I code is proprietary and on a massive scale (tens of millions of LOC) and
// can't be shared. This is compact, portable, and fun. Enjoy.
//
// @daboskusu on X
// pauldefrain@yahoo.com
// pdefrain@gmail.com
// https://www.linkedin.com/in/pauldefrain/
// 
onst SCREENWIDTH = 320;
const SCREENHEIGHT = 300;

const WIDTH = 320;
const HEIGHT = 300;
const RMULT = 10;
const SPEED = 1;
const MAXSHOTS = 8;
const MAXASHOTS = 8;
const SHOTLIFE = 80;
const MAXROCKS = 50;

const SOUND_ALIEN_SHOT = 0;
const SOUND_SHIP_SHOT = 1;
const SOUND_ROCK_EXPLODE = 2;
const SOUND_SHIP_LAUNCH = 3;
const SOUND_SHIP_EXPLODE = 4;
const SOUND_ALIEN_SHIP = 5;
const SOUND_FREE_SHIP = 6;
const SOUND_SHIP_THRUST = 7;

Rocks = new Array();
Ship = new Object();
Shots = new Array();

// Set true when a game is not in progress
GameOver = true;
// The score of the in-progress game
CurrentScore = 0;
// The all-time HighScore
HighScore = 0;
// Timeout for no rocks present - times in-between rounds
NoRocks = 0;
// TJhe number oif large rocks for the current round
RockCount = 3;
// The score at which the next free ship is earned
FreeShip = 10000;
ProduceSound = true;

// Game color palette
ColorBlack = "rgb(  0,  0,  0)";
ColorGreen = "rgb( 0, 255,  0)";
ColorRed = "rgb(255,  0,  0)";
RockColor = "rgb(100,255, 50)";
AlienColor = "rgb(200,200,200)";
ColorBlue = "rgb( 50, 50,255)";
ColorGrey = "rgb(100,100,100)";
ColorWhite = "rgb(255,255,255)";

// The player ship geometry
ShipStyle = new Object();
ShipStyle.lines = 3;
ShipStyle.x = new Array(110.0, -70.0, -70.0, 110.0);
ShipStyle.y = new Array(0.0, -60.0, 60.0, 0.0);

// Thrust geometry
ThrustStyle = new Object();
ThrustStyle.lines = 3;
ThrustStyle.x = new Array(-70, -140, -70, -70);
ThrustStyle.y = new Array(-45, 0, 45, -45);

// Alien ship geometry
LAStyle = new Object();
LAStyle.lines = 12;
LAStyle.plines = 9;
LAStyle.x = new Array(0, 40, 60, 120, 140, 180, 160, 20, 0, 180, 140, 40, 0);
LAStyle.y = new Array(70, 40, 0, 0, 40, 70, 100, 100, 70, 70, 40, 40, 70);

// Create a new alien ship and set it in waiting.
LAShip = new Object();
LAShip.waiting = 1000;

// Number of alien ships that have occurred in the game.
AlienShipCount = 0;

//
// Define the rock gemoetry
//
RockTypes = new Array();
RockTypes[0] = new Object();
RockTypes[0].lines = 15;
RockTypes[0].x = new Array(40, 20, 100, 100, 20, 20, 70, 110, 110, 190, 280, 290, 210, 180, 110, 40);
RockTypes[0].y = new Array(70, 110, 150, 170, 150, 200, 240, 240, 270, 290, 250, 130, 70, 20, 20, 70);

RockTypes[1] = new Object();
RockTypes[1].lines = 14;
RockTypes[1].x = new Array(40, 20, 0, 20, 90, 90, 180, 240, 290, 250, 180, 180, 110, 90, 40);
RockTypes[1].y = new Array(70, 110, 150, 200, 200, 280, 230, 200, 130, 80, 90, 20, 20, 70, 70);

RockTypes[2] = new Object();
RockTypes[2].lines = 14;
RockTypes[2].x = new Array(40, 20, 0, 20, 90, 90, 180, 240, 290, 250, 180, 180, 110, 90, 40);
RockTypes[2].y = new Array(70, 110, 150, 200, 200, 280, 230, 200, 130, 80, 90, 20, 20, 70, 70);


RockTypes[3] = new Object();
RockTypes[3].lines = 15;
RockTypes[3].x = new Array(20, 0, 30, 20, 70, 120, 160, 180, 200, 170, 190, 170, 100, 50, 50, 20);
RockTypes[3].y = new Array(50, 80, 130, 160, 190, 190, 150, 150, 160, 70, 50, 20, 0, 20, 50, 50);

RockTypes[4] = new Object();
RockTypes[4].lines = 15;
RockTypes[4].x = new Array(20, 0, 30, 20, 70, 120, 160, 180, 200, 170, 190, 170, 100, 50, 50, 20);
RockTypes[4].y = new Array(50, 80, 130, 160, 190, 190, 150, 150, 160, 70, 50, 20, 0, 20, 50, 50);

RockTypes[5] = new Object();
RockTypes[5].lines = 15;
RockTypes[5].x = new Array(20, 0, 30, 20, 70, 120, 160, 180, 200, 170, 190, 170, 100, 50, 50, 20);
RockTypes[5].y = new Array(50, 80, 130, 160, 190, 190, 150, 150, 160, 70, 50, 20, 0, 20, 50, 50);

RockTypes[6] = new Object();
RockTypes[6].lines = 16;
RockTypes[6].x = new Array(10, 20, 0, 0, 20, 40, 60, 80, 90, 90, 100, 100, 80, 90, 70, 30, 10);
RockTypes[6].y = new Array(20, 40, 40, 70, 90, 90, 100, 100, 80, 60, 60, 30, 30, 10, 0, 0, 20);

RockTypes[7] = new Object();
RockTypes[7].lines = 16;
RockTypes[7].x = new Array(10, 20, 0, 0, 20, 40, 60, 80, 90, 90, 100, 100, 80, 90, 70, 30, 10);
RockTypes[7].y = new Array(20, 40, 40, 70, 90, 90, 100, 100, 80, 60, 60, 30, 30, 10, 0, 0, 20);

RockTypes[8] = new Object();
RockTypes[8].lines = 16;
RockTypes[8].x = new Array(10, 20, 0, 0, 20, 40, 60, 80, 90, 90, 100, 100, 80, 90, 70, 30, 10);
RockTypes[8].y = new Array(20, 40, 40, 70, 90, 90, 100, 100, 80, 60, 60, 30, 30, 10, 0, 0, 20);

Debris = new Array();


//
// Java Rocks geometry
//
LJ = new Object();
LJ.lines = 8;
LJ.x = new Array(0, 0, 1, 4, 4, 3, 3, 1, 0);
LJ.y = new Array(4, 5, 6, 6, 0, 0, 5, 5, 4);

LA = new Object();
LA.lines = 8;
LA.x = new Array(0, 1, 2, 3, 4, 5, 3, 2, 0);
LA.y = new Array(6, 6, 2, 2, 6, 6, 0, 0, 6);

LV = new Object();
LV.lines = 8;
LV.x = new Array(0, 2, 3, 5, 4, 3, 2, 1, 0);
LV.y = new Array(0, 6, 6, 0, 0, 4, 4, 0, 0);

LR = new Object();
LR.lines = 11;
LR.x = new Array(0, 0, 1, 1, 2, 3, 4, 3, 4, 4, 3, 0);
LR.y = new Array(0, 6, 6, 3, 3, 6, 6, 3, 2, 1, 0, 0);

LO = new Object();
LO.lines = 8;
LO.x = new Array(0, 0, 1, 3, 4, 4, 3, 1, 0);
LO.y = new Array(2, 4, 6, 6, 4, 2, 0, 0, 2);

LC = new Object();
LC.lines = 16;
LC.x = new Array(0, 0, 1, 3, 4, 4, 3, 2, 1, 1, 2, 3, 4, 4, 3, 1, 0);
LC.y = new Array(1, 5, 6, 6, 5, 4, 4, 5, 5, 1, 1, 2, 2, 1, 0, 0, 1);

LK = new Object();
LK.lines = 12;
LK.x = new Array(0, 0, 1, 1, 2, 3, 4, 2, 4, 4, 1, 1, 0);
LK.y = new Array(0, 6, 6, 4, 4, 6, 6, 3, 1, 0, 2, 0, 0);

LS = new Object();
LS.lines = 14;
LS.x = new Array(0, 0, 3, 3, 0, 0, 3, 4, 4, 3, 1, 1, 4, 4, 0);
LS.y = new Array(0, 3, 3, 5, 5, 6, 6, 5, 3, 2, 2, 1, 1, 0, 0);

Larry = new Array();
Larry[0] = new Object();
Larry[0].letter = LJ;
Larry[0].x = 1;
Larry[0].y = 0;

Larry[1] = new Object();
Larry[1].letter = LA;
Larry[1].x = 6;
Larry[1].y = 0;

Larry[2] = new Object();
Larry[2].letter = LV;
Larry[2].x = 12;
Larry[2].y = 0;

Larry[3] = new Object();
Larry[3].letter = LA;
Larry[3].x = 18;
Larry[3].y = 0;

Larry[4] = new Object();
Larry[4].letter = LR;
Larry[4].x = 0;
Larry[4].y = 9;

Larry[5] = new Object();
Larry[5].letter = LO;
Larry[5].x = 5;
Larry[5].y = 9;

Larry[6] = new Object();
Larry[6].letter = LC;
Larry[6].x = 10;
Larry[6].y = 9;

Larry[7] = new Object();
Larry[7].letter = LK;
Larry[7].x = 15;
Larry[7].y = 9;

Larry[8] = new Object();
Larry[8].letter = LS;
Larry[8].x = 20;
Larry[8].y = 9;

LScale = 10;


// Bind keyboard handlers
window.addEventListener('keyup', function (event) { Asteriods.onKeyUp(event); }, false);
window.addEventListener('keydown', function (event) { Asteriods.onKeyDown(event); }, false);

// key codes for ganme control
var Key = {
   SPACE: 32,
   RIGHT: 88,
   LEFT: 90,
   FIRE: 190,
   THRUST: 188
};


//
// Asteriods ganme object
//
var Asteriods = {
   fps: 60,
   width: 320,
   height: 300,

   // Overlapping sounds
   fireSounds: [],

   // One time only sounds
   saucerSound: new Audio('./Audio/saucer.wav'),
   beat1Sound: new Audio('./Audio/beat1.wav'),
   beat2Sound: new Audio('./Audio/beat2.wav'),
   newshipSound: new Audio('./Audio/newship.wav'),
   thrustSound: new Audio('./Audio/thrust.wav'),
   tinkleSound: new Audio('./Audio/tinkle.wav'),
   explode1Sound: new Audio('./Audio/explode1.wav'),
   explode2Sound: new Audio('./Audio/explode2.wav'),

   // beat timing accumulator
   beatCount: 0,

   onKeyDown: function (event) {
      console.log("Key down:", event.keyCode);
      switch (event.keyCode) {
         case Key.LEFT:
            this.handleCCWHold(event);
            break;
         case Key.RIGHT:
            this.handleCWHold(event);
            break;
         case Key.FIRE:
            this.handleFireTap(event);
            break;
         case Key.THRUST:
            this.handleThrustHold(event);
            break;
         case Key.SPACE:
            if (GameOver == true) {
               // Start new game.
               this.initializeRocks(3);
               this.initializeShip(3);
               Asteriods.launchShip();
               GameOver = false;
            } else if (!Ship.active) {
               if (Ship.lives > 0 && Ship.restore <= 0) {
                  this.launchShip();
               }
            }
            break;
      }
   },


   onKeyUp: function (event) {
      console.log("Key up:", event.keyCode);
      switch (event.keyCode) {
         case Key.LEFT:
            this.handleCCWHoldEnd(event);
            break;
         case Key.RIGHT:
            this.handleCWHoldEnd(event);
            break;
         case Key.THRUST:
            this.handleThrustHoldEnd(event);
            break;
      }
   },

   // One time initialization
   setup: function () {
      this.canvas = document.getElementById("gameCanvas");
      this.context = this.canvas.getContext("2d");
      this.canvas.width = Asteriods.width;
      this.canvas.height = Asteriods.height;

      HighScore = this.loadHighScore();

      for (let i = 0; i < 5; i++) {
         this.fireSounds.push(new Audio('./Audio/fire.wav'));
      }
   },

   // Called once after a game has completed (no more ships)
   resetGame: function () {
      this.playSound(SOUND_ALIEN_SHIP, false);
      LAShip.active = false;
      LAShip.waiting = 1000;
      AlienShipCount = 0;
      GameOver = true;
      FreeShip = 10000;
      RockCount = 3;
      this.saveHighScore(HighScore);
   },

   // Sounds handler
   playSound: function (sound, start = true) {
      if (ProduceSound == false) {
         return;
      }
      switch (sound) {
         case SOUND_ALIEN_SHOT:
         case SOUND_SHIP_SHOT:
            let availableSound = this.fireSounds.find(sound => sound.paused);
            if (availableSound) {
               availableSound.currentTime = 0;
               availableSound.play();
            } else {
               console.log("no sound available");
            }
            return;
         case SOUND_ROCK_EXPLODE:
            if (Math.random() < 0.5) {
               this.explode1Sound.pause();
               this.explode1Sound.play();
            } else {
               this.explode2Sound.pause();
               this.explode2Sound.play();
            }
            return;
         case SOUND_SHIP_LAUNCH:
            return;
         case SOUND_SHIP_EXPLODE:
            if (Math.random() < 0.5) {
               this.tinkleSound.pause();
               this.explode1Sound.pause();
               this.explode1Sound.play();
               this.tinkleSound.play();
            } else {
               this.tinkleSound.pause();
               this.explode2Sound.pause();
               this.explode2Sound.play();
               this.tinkleSound.play();
            }
            return;
         case SOUND_ALIEN_SHIP:
            if(start) {
               this.saucerSound.loop = true;
               this.saucerSound.play();               
            } else {
               this.saucerSound.pause();
            }
            return;
         case SOUND_FREE_SHIP:
            this.newshipSound.play();
            return;
         case SOUND_SHIP_THRUST:
            if(start) {
               this.thrustSound.loop = true;
               this.thrustSound.play();
            } else {
               this.thrustSound.pause();
            }
         default:
            return;
      }
   },

   // Save the high score to browser local storage
   saveHighScore: function(newHighScore) {
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("highScore", newHighScore);
      } else {
        console.log("Local Storage not supported");
      }
    },
    
    // Function to load the high score from browser local storage
    loadHighScore: function() {
      if (typeof(Storage) !== "undefined") {
        let storedScore = localStorage.getItem("highScore");
        return storedScore ? parseInt(storedScore) : 0; 
      } else {
        console.log("Local Storage not supported");
        return 0; 
      }
    },
    

   // Game startup
   start: function () {
      this.setup();

      this.initializeRocks(RockCount);
      this.initializeShip(3);
      this.initializeShots();
      this.initializeDebris();

      this.intervalId = setInterval(Asteriods.run, 1000 / Asteriods.fps);
   },


   drawGame: function () {
      this.context.clearRect(0, 0, Asteriods.width, Asteriods.height);
      this.animateGame();
   },


   run: function () {
      Asteriods.drawGame();
   },


   score: function (score) {
      if (Ship.active) {
         CurrentScore += score;
         if (CurrentScore > FreeShip) {
            Ship.lives++;
            FreeShip += 10000;
            this.playSound(SOUND_FREE_SHIP);
         }
         if(CurrentScore > HighScore) {
            HighScore = CurrentScore;
         }
      }
   },


   // Activate a ship at a proper position and direction of travel for animation.
   initializeAlien: function () {
      LAShip.active = true;
      // Play sound when the alien ship is present
      this.playSound(SOUND_ALIEN_SHIP);
      
      // The first several skips are all large before any small ones will appear.
      let small = false;
      if (AlienShipCount >= 4) {
         if (Math.random() > 0.5) {
            small = true;
         }
      }

      var rate = 5;
      if (small) {
         rate = 8;
      }
      // Does the ship enter from the left or right?
      if (Math.random() < 0.5) {
         LAShip.xinc = rate;
         LAShip.x = 0;
      }
      else {
         LAShip.xinc = -rate;
         LAShip.x = WIDTH;
      }
      LAShip.y = Math.random() * HEIGHT;
      LAShip.yinc = 2 * rate - (Math.random() * rate);

      if (small) {
         LAShip.shotCountdown = 50;
      }
      else {
         LAShip.shotCountdown = 75;
      }
      LAShip.change = 50 + 100 * Math.random();
      LAShip.small = small;
      LAShip.life = 1000;
      //LAShip.active = false;
      LAShip.waiting = 1000;
      LAShip.c1 = 150;
      LAShip.c2 = 150;
   },


   createAlienShot: function () {
      for (var i = MAXASHOTS; i < MAXSHOTS + MAXASHOTS; i++) {
         if (Shots[i].active == false) {
            this.playSound(SOUND_ALIEN_SHOT);
            var angle = 360 * Math.random();
            var rangle = (angle * Math.PI) / 180.0;
            // TODO : The start location here varies based on ship size -- which isn't being done yet.
            var x = LAShip.x + 90;
            var y = LAShip.y + 60;
            var dx = 30 * Math.cos(rangle);
            var dy = 30 * Math.sin(rangle);
            Shots[i].x = x;
            Shots[i].y = y;
            Shots[i].angle = angle;
            Shots[i].xinc = dx + LAShip.xinc;
            Shots[i].yinc = dy + LAShip.yinc;
            Shots[i].lifeTime = 0;
            Shots[i].active = true;
            LAShip.c1 = 150;
            LAShip.c2 = 150;
            break;
         }
      }
   },


   moveAlien: function () {
      if (LAShip.active > 0) {
         LAShip.life--;
         if (--LAShip.shotCountdown <= 0) {
            // Fire shot
            this.createAlienShot();
            // Reset count down
            LAShip.shotCountdown = 500;
            if (LAShip.small) {
               LAShip.shotCountdown = 50;
            }
            else {
               LAShip.shotCountdown = 75;
            }
         }
         if (--LAShip.change <= 0) {
            LAShip.yinc = 2 * LAShip.xinc - (Math.random() * LAShip.xinc);
            if (Math.random() > 0.5) {
               LAShip.yinc = -LAShip.yinc;
            }
            LAShip.change = 50 + 100 * Math.random();
         }
         LAShip.x += LAShip.xinc;
         LAShip.y += LAShip.yinc;
         if (LAShip.x < 0) LAShip.x += WIDTH * RMULT;
         if (LAShip.x > WIDTH * RMULT) LAShip.x -= WIDTH * RMULT;
         if (LAShip.y < 0) LAShip.y += HEIGHT * RMULT;
         if (LAShip.y > HEIGHT * RMULT) LAShip.y -= HEIGHT * RMULT;
         if (LAShip.c1 < 254) {
            LAShip.c1 += 2 * Math.random();
         }
         if (LAShip.c2 < 254) {
            LAShip.c2 += 2 * Math.random();
         }
      }
      else {
         if (LAShip.waiting-- <= 0) {
            this.initializeAlien();
         }
      }
   },


   drawAlien: function () {
      if (LAShip.active > 0) {
         this.context.strokeStyle = AlienColor;
         this.context.beginPath();
         var d = 1;
         if (LAShip.small) {
            d = 2;
         }
         this.context.moveTo((LAShip.x + LAStyle.x[0] / d) / RMULT, (LAShip.y + LAStyle.y[0] / d) / RMULT);
         for (var i = 1; i < LAStyle.lines; i++) {
            var x = LAShip.x + LAStyle.x[i] / d;
            var y = LAShip.y + LAStyle.y[i] / d;
            this.context.lineTo(x / RMULT, y / RMULT);

            // Test if the point hits a rock
            for (var j = 0; j < Rocks.length; j++) {
               var r = Rocks[j];
               if (r.active == true) {
                  if (this.testPointHitsRock(x, y, j) == true) {
                     this.explodeRock(j);
                     this.explodeAlien();
                     break;
                  }
               }
            }
         }
         this.context.closePath();
         this.context.stroke();
      }
   },


   drawShip: function () {
      if (Ship.active == false) {
         return
      }
      var explode = false;
      var shipColor;
      if (Ship.active == true) {
         shipColor = ColorWhite;
      }
      else if (Ship.restore <= 0) {
         shipColor = ColorGrey;
      }
      else {
         return false;
      }
      var px = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var py = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      // Apply translations based on angle [0, 359]
      var rangle = (Ship.angle * Math.PI) / 180.0;
      var sr = Math.sin(rangle);
      var cr = Math.cos(rangle);
      for (var i = 0; i < ShipStyle.lines; i++) {
         px[i] = Ship.x + (ShipStyle.x[i] * cr + ShipStyle.y[i] * sr);
         py[i] = Ship.y + (ShipStyle.x[i] * sr - ShipStyle.y[i] * cr);
      }
      // Render the ship
      this.context.strokeStyle = shipColor;
      this.context.beginPath();
      this.context.moveTo(px[0] / RMULT, py[0] / RMULT);
      for (var i = 1; i < ShipStyle.lines; i++) {
         this.context.lineTo(px[i] / RMULT, py[i] / RMULT);
      }
      this.context.closePath();
      this.context.stroke();

      if (Ship.active == true) {
         // Test if the ship hit a rock.
         for (var j = 0; j < Rocks.length; j++) {
            var r = Rocks[j];
            if (r.active == true) {
               var rs = RockTypes[r.type];
               for (var i = 0; i < ShipStyle.lines; i++) {
                  if (this.pointInPoly(px[i], py[i], r.x, r.y, rs.x, rs.y, rs.lines)) {
                     this.explodeRock(j);
                     explode = true;
                     break;
                  }
               }
            }
         }
         // Test if the ship hit an alien (test each ship verticy for being inside the alien).
         if (LAShip.active == true) {
            for (var i = 0; i < ShipStyle.lines; i++) {
               if (this.pointInPoly(px[i], py[i], LAShip.x, LAShip.y, LAStyle.x, LAStyle.y, LAStyle.plines)) {
                  this.explodeAlien();
                  explode = true;
                  break;
               }
            }
         }
         // Test if an alien shot hit the ship.
         for (var i = MAXASHOTS; i < MAXSHOTS + MAXASHOTS; i++) {
            if (Shots[i].active) {
               if (this.pointInPoly(Shots[i].x, Shots[i].y, 0, 0, px, py, ShipStyle.lines)) {
                  Shots[i].active = false;
                  explode = true;
                  break;
               }
            }
         }
      }

      if (Ship.thrustOn && !explode) {
         // Apply translations based on angle [0, 359]
         for (var i = 0; i < ThrustStyle.lines; i++) {
            px[i] = (Ship.x + (ThrustStyle.x[i] * cr + ThrustStyle.y[i] * sr)) / RMULT;
            py[i] = (Ship.y + (ThrustStyle.x[i] * sr - ThrustStyle.y[i] * cr)) / RMULT;
         }
         // Render the thrust
         this.context.strokeStyle = ColorRed;
         this.context.beginPath();
         this.context.moveTo(px[0], py[0]);
         for (var i = 1; i < ThrustStyle.lines; i++) {
            this.context.lineTo(px[i], py[i]);
         }
         this.context.closePath();
         this.context.stroke();
      }
      return explode;
   },


   clearField: function () {
      this.context.fillStyle = ColorBlack;
      this.context.fillRect(0, 0, WIDTH, HEIGHT);
   },


   applyCCW: function () {
      if (Ship.active) {
         Ship.angle -= 3;
         if (Ship.angle <= 0) {
            Ship.angle = 360;
         }
      }
   },


   handleCCWTap: function (event) {
      Ship.ccwHeld = false;
      this.applyCCW();
   },


   handleCCWHold: function (event) {
      Ship.ccwHeld = true;
      this.applyCCW();
   },


   handleCCWHoldEnd: function (event) {
      Ship.ccwHeld = false;
   },


   applyCW: function () {
      if (Ship.active) {
         Ship.angle += 3;
         if (Ship.angle >= 360) {
            Ship.angle = 0;
         }
      }
   },


   handleCWTap: function (event) {
      Ship.cwHeld = false;
      this.applyCW();
   },


   handleCWHold: function (event) {
      Ship.cwHeld = true;
      this.applyCW();
   },


   handleCWHoldEnd: function (event) {
      Ship.cwHeld = false;
   },


   handleFireTap: function (event) {
      this.applyFire();
   },


   applyFire: function () {
      if (Ship.active) {
         for (var i = 0; i < MAXSHOTS; i++) {
            if (Shots[i].active == false) {
               this.createShot(i);
               return;
            }
         }
      }
   },


   initializeShots: function () {
      for (var i = 0; i < MAXSHOTS + MAXASHOTS; i++) {
         Shots[i] = new Object();
         Shots[i].active = false;
         Shots[i].x = 0;
         Shots[i].y = 0;
         Shots[i].xinc = 0;
         Shots[i].yinc = 0;
         Shots[i].lifeTime = 0;
      }
   },


   createShot: function (i) {
      this.playSound(SOUND_SHIP_SHOT);
      var rangle = (Ship.angle * Math.PI) / 180.0;
      var x = Ship.x + 110 * Math.cos(rangle);
      var y = Ship.y + 110 * Math.sin(rangle);
      var dx = 30 * Math.cos(rangle);
      var dy = 30 * Math.sin(rangle);
      Shots[i].active = true;
      Shots[i].x = x;
      Shots[i].y = y;
      Shots[i].angle = Ship.angle;
      Shots[i].xinc = dx + Ship.xinc;
      Shots[i].yinc = dy + Ship.yinc;
      Shots[i].lifeTime = 0;
   },


   moveShots: function () {
      for (var i = 0; i < MAXSHOTS + MAXASHOTS; i++) {
         var s = Shots[i];
         if (s.active == true) {
            if (s.lifeTime < SHOTLIFE) {
               s.lifeTime++;
               s.x += s.xinc;
               s.y += s.yinc;
               if (s.x > WIDTH * RMULT) {
                  s.x -= WIDTH * RMULT;
               }
               else if (s.x < 0) {
                  s.x += WIDTH * RMULT;
               }
               if (s.y > HEIGHT * RMULT) {
                  s.y -= HEIGHT * RMULT;
               }
               else if (s.y < 0) {
                  s.y += HEIGHT * RMULT;
               }
            }
            else {
               s.active = false;
            }
         }
      }
   },


   drawShots: function () {
      for (var i = 0; i < MAXSHOTS + MAXASHOTS; i++) {
         if (Shots[i].active == true) {
            var x = Shots[i].x / RMULT;
            var y = Shots[i].y / RMULT;
            this.context.strokeStyle = ColorRed;
            this.context.beginPath();
            this.context.moveTo(x, y);
            this.context.lineTo(x + 1, y);
            this.context.lineTo(x + 1, y + 1);
            this.context.lineTo(x, y + 1);
            this.context.closePath();
            this.context.stroke();
         }
      }
   },


   applyThrust: function () {
      if (Ship.active) {
         var rangle = ((Ship.angle + 45) * Math.PI) / 180.0;
         var dx = Math.cos(rangle) + Math.sin(rangle);
         var dy = Math.sin(rangle) - Math.cos(rangle);
         Ship.xinc += dx / 3;
         Ship.yinc += dy / 3;
         Ship.thrustOn = true;
      }
   },


   handleThrustTap: function (event) {
      Ship.thrustHeld = false;
      this.applyThrust();
   },


   handleThrustHold: function (event) {
      if(!Ship.thrustHeld) {
         this.playSound(SOUND_SHIP_THRUST);
      }
      Ship.thrustHeld = true;
      this.applyThrust();
   },


   handleThrustHoldEnd: function (event) {
      this.playSound(SOUND_SHIP_THRUST, false);
      Ship.thrustHeld = false;
   },


   square: function () {
      this.context.fillStyle = ColorGreen;
      this.context.fillRect(10, 10, 55, 50);
   },


   // Places ship into an inactive on-screen ready state with so many lives remaining.
   initializeShip: function (lives) {
      Ship.x = RMULT * WIDTH / 2;
      Ship.y = RMULT * HEIGHT / 2;
      Ship.xinc = 0;
      Ship.yinc = 0;
      Ship.angle = 270;
      Ship.thrustHeld = false;
      Ship.ccwHeld = false;
      Ship.cwHeld = false;
      Ship.lives = lives;
      Ship.active = false;
      Ship.restore = 0;
      Ship.thrustOn = false;
      CurrentScore = 0;
   },


   // Places ship into an inactive on-screen and ready state.
   readyShip: function () {
      Ship.x = RMULT * WIDTH / 2;
      Ship.y = RMULT * HEIGHT / 2;
      Ship.xinc = 0;
      Ship.yinc = 0;
      Ship.angle = 270;
      Ship.thrustHeld = false;
      Ship.ccwHeld = false;
      Ship.cwHeld = false;
      Ship.restore = 0;
      Ship.thrustOn = false;
   },


   // Places the ship into an active state.
   launchShip: function () {
      if (Ship.active == false) {
         if (Ship.lives > 0) {
            this.playSound(SOUND_SHIP_LAUNCH);

            Ship.x = RMULT * WIDTH / 2;
            Ship.y = RMULT * HEIGHT / 2;
            Ship.xinc = 0;
            Ship.yinc = 0;
            Ship.angle = 270;
            Ship.thrustHeld = false;
            Ship.ccwHeld = false;
            Ship.cwHeld = false;
            Ship.lives--;
            Ship.thrustOn = false;
            Ship.active = true;
         }
      }
   },


   initializeRocks: function (count) {
      for (var i = 0; i < count; i++) {
         if (Rocks[i] == null) {
            Rocks[i] = new Object;
         }
         var rt = Math.floor(Math.random() * 3);
         if (rt >= 3) {
            rt = 2;
         }

         Rocks[i].type = rt;
         Rocks[i].active = true;
         Rocks[i].x = Math.floor(Math.random() * RMULT * WIDTH);
         Rocks[i].y = Math.floor(Math.random() * RMULT * HEIGHT);
         Rocks[i].xinc = Math.floor(Math.random() * 21) - 10;
         Rocks[i].yinc = Math.floor(Math.random() * 21) - 10;
      }
      for (var j = count; j < MAXROCKS; j++) {
         if (Rocks[j] == null) {
            Rocks[j] = new Object();
         }
         Rocks[j].type = 0;
         Rocks[j].active = false;
         Rocks[j].x = 0;
         Rocks[j].y = 0;
         Rocks[j].xinc = 0;
         Rocks[j].yinc = 0;
         Rocks[j].newRock = true;
      }
   },


   moveRocks: function () {
      var found = false;
      for (var i = 0; i < Rocks.length; i++) {
         var r = Rocks[i];
         if (r.active == true) {
            found = true;
            NoRocks = 0;
            r.x += r.xinc;
            r.y += r.yinc;

            if (r.x > RMULT * WIDTH) {
               r.x = 0;
            }
            if (r.x < 0) {
               r.x = RMULT * WIDTH;
            }
            if (r.y > RMULT * HEIGHT) {
               r.y = 0;
            }
            if (r.y < 0) {
               r.y = RMULT * HEIGHT;
            }
            r.newRock = false;
         }
      }
      if (found == false) {
         if (NoRocks++ > 250) {
            if (RockCount < 8) {
               RockCount++;
            }
            this.initializeRocks(RockCount);
         }
      }
   },


   drawRocks: function () {
      for (var i = 0; i < Rocks.length; i++) {
         var r = Rocks[i];
         if (r.active == true) {
            this.drawRock(r);
         }
      }
   },


   drawRock: function (r) {
      var style = RockTypes[r.type];
      this.context.strokeStyle = RockColor;
      this.context.beginPath();
      this.context.moveTo((r.x + style.x[0]) / RMULT, (r.y + style.y[0]) / RMULT);
      for (var i = 1; i < style.lines; i++) {
         this.context.lineTo((r.x + style.x[i]) / RMULT, (r.y + style.y[i]) / RMULT);
      }
      this.context.closePath();
      this.context.stroke();
   },


   moveShip: function () {
      if (Ship.restore > 0) {
         Ship.restore--;
      }

      if (Ship.thrustHeld) {
         this.applyThrust();
      }
      if (Ship.ccwHeld) {
         this.applyCCW();
      }
      if (Ship.cwHeld) {
         this.applyCW();
      }
      Ship.x += Ship.xinc;
      Ship.y += Ship.yinc;

      if (Ship.x > RMULT * WIDTH) {
         Ship.x = 0;
      }
      if (Ship.x < 0) {
         Ship.x = RMULT * WIDTH;
      }
      if (Ship.y > RMULT * HEIGHT) {
         Ship.y = 0;
      }
      if (Ship.y < 0) {
         Ship.y = RMULT * HEIGHT;
      }
   },


   shotsHitSomething: function () {
      for (var i = 0; i < MAXSHOTS + MAXASHOTS; i++) {
         var s = Shots[i];
         if (s.active == true) {
            // Test if the shot hit a rock.
            for (var j = 0; j < Rocks.length; j++) {
               var r = Rocks[j];
               if (r.active == true) {
                  if (this.testPointHitsRock(s.x, s.y, j) == true) {
                     s.active = false;
                     this.explodeRock(j);
                  }
               }
            }
            // Test if the shot hit an alien.
            if (LAShip.active && i < MAXSHOTS) {
               if (this.pointInPoly(s.x, s.y, LAShip.x, LAShip.y, LAStyle.x, LAStyle.y, LAStyle.plines)) {
                  this.explodeAlien();
               }
            }
            // Test if an alien shot hit the ship (this is checked in drawShip).
         }
      }
   },


   // Return true if point (x,y) lies within a polygon located at (rx, ry) with nvert verticies of (rxa[], rya[]).
   pointInPoly: function (x, y, rx, ry, rxa, rya, nvert) {
      var i = 0;
      var j = 0;
      var c = false;

      var i = 0;
      var j = nvert - 1;

      for (i = 0; i < nvert; j = i++) {
         var rxi = rx + rxa[i];
         var ryi = ry + rya[i];
         var rxj = rx + rxa[j];
         var ryj = ry + rya[j];

         if (((ryi > y) != (ryj > y)) && (x < ((rxj) - (rxi)) * (y - (ryi)) / ((ryj) - (ryi)) + (rxi))) {
            c = !c;
         }
      }
      return c;
   },


   // Test if point (x,y) hits Rock[j]
   testPointHitsRock: function (x, y, j) {
      var r = Rocks[j];
      var style = RockTypes[r.type];
      if (this.pointInPoly(x, y, r.x, r.y, style.x, style.y, style.lines)) {
         return true;
      }
      return false;
   },


   explodeAlien: function () {
      LAShip.active = false;
      this.playSound(SOUND_ALIEN_SHIP, false);
      this.playSound(SOUND_ROCK_EXPLODE);
      // Create debris.
      for (var i = 0; i < LAStyle.plines; i++) {
         this.createDebris(LAShip.x, LAShip.y, 50, LAShip.xinc, LAShip.yinc, LAStyle.x[i], LAStyle.y[i], LAStyle.x[i + 1], LAStyle.y[i + 1], 90);
      }
      if (LAShip.small) {
         this.score(1000);
      }
      else {
         this.score(250);
      }
      AlienShipCount++;
      var delta = 0;
      if (AlienShipCount < 5) {
         delta = 100 * AlienShipCount;
      }
      LAShip.waiting = 1000 - delta;
   },


   explodeRock: function (j) {
      var type = 0;
      var r = Rocks[j];

      // Do not explode a rock that has not been drawn yet.
      if (r.newRock) {
         return;
      }
      this.playSound(SOUND_ROCK_EXPLODE);

      // Create debris.
      var rs = RockTypes[r.type];
      for (var i = 0; i < rs.lines; i++) {
         this.createDebris(r.x + rs.x[i], r.y + rs.y[i], 50, r.xinc, r.yinc, rs.x[i] / 4, rs.y[i] / 4, rs.x[i + 1] / 4, rs.y[i + 1] / 4, 0);
      }

      var rt = Math.floor(Math.random() * 3);
      if (rt >= 2) rt = 2;
      switch (r.type) {
         case 0:
         case 1:
         case 2:
            this.score(20);
            type = rt + 3;
            break;
         case 3:
         case 4:
         case 5:
            this.score(50);
            type = rt + 6;
            break;
         case 6:
         case 7:
         case 8:
            this.score(100);
            type = -1;
            break;
         default:
            type = -1;
            break;
      };

      if (type == -1) {
         r.active = false;
      }
      else {
         // Spawn a child rock.
         for (var i = 0; i < Rocks.length; i++) {
            var nr = Rocks[i];
            if (nr.active == false) {
               nr.x = r.x;
               nr.y = r.y;
               nr.xinc = r.xinc + 10 * (Math.random() - 0.5);
               nr.yinc = r.yinc + 10 * (Math.random() - 0.5);
               nr.type = type;
               nr.active = true;
               nr.newRock = true;
               break;
            }
         }
         // Alter this rock.
         r.type = type;
         r.xinc += 20 * (Math.random() - 0.5);
         r.yinc += 20 * (Math.random() - 0.5);
      }
   },


   linesIntersect: function (x1, y1, x2, y2, x3, y3, x4, y4) {
      var n1 = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
      var d1 = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
      var n2 = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
      var d2 = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

      if (d1 != 0 && d2 != 0) {
         var u1 = n1 / d1;
         var u2 = n2 / d2;
         if ((u1 >= 0.0 && u1 <= 1.0) && (u2 >= 0.0 && u2 <= 1.0)) {
            return true;
         }
      }
      return false;
   },


   explodeShip: function () {
      Ship.active = false;
      Ship.restore = 200;

      this.playSound(SOUND_SHIP_EXPLODE);

      for (var i = 0; i < ShipStyle.lines; i++) {
         this.createDebris(Ship.x, Ship.y, 150, Ship.xinc, Ship.yinc, ShipStyle.x[i], ShipStyle.y[i], ShipStyle.x[i + 1], ShipStyle.y[i + 1], Ship.angle);
      }
      if (Ship.lives == 0) {
         this.resetGame()
      }
   },


   initializeDebris: function () {
      for (var i = 0; i < 100; i++) {
         Debris[i] = new Object();
         Debris[i].type = 0;
         Debris[i].x = 0;
         Debris[i].y = 0;
         Debris[i].x1 = 0;
         Debris[i].y1 = 0;
         Debris[i].x2 = 0;
         Debris[i].y2 = 0;
         Debris[i].xinc = 0;
         Debris[i].yinc = 0;
         Debris[i].spin = 0;
         Debris[i].angle = 0;
         Debris[i].size = 0;
         Debris[i].color = "rgb(150,150,150)";
         Debris[i].life = 0;
         Debris[i].active = false;
      }
   },


   createDebris: function (x, y, size, xinc, yinc, x1, y1, x2, y2, angle) {
      for (var i = 0; i < Debris.length; i++) {
         var d = Debris[i];
         if (d.active == false) {
            d.type = 1;
            d.x = x;
            d.y = y;
            d.x1 = x1; //(size - (2*Math.random() * size));
            d.y1 = y1; //(size - (2*Math.random() * size));
            d.x2 = x2; //(size - (2*Math.random() * size));
            d.y2 = y2; //(size - (2*Math.random() * size));
            d.xinc = xinc + ((xinc - (2 * xinc * Math.random())) / 10);
            d.yinc = yinc + ((yinc - (2 * yinc * Math.random())) / 10);
            d.spin = 5 - 10 * Math.random();
            d.angle = angle; // 360*Math.random();
            d.size = size;
            d.life = 100;
            d.active = true;
            return;
         }
      }
   },


   moveDebris: function () {
      for (var i = 0; i < Debris.length; i++) {
         var d = Debris[i];
         if (d.active == true) {
            if (d.life-- > 0) {
               d.x += d.xinc;
               d.y += d.yinc;
               d.angle += d.spin;
               if (d.angle < 0) d.angle += 360;
               if (d.angle > 360) d.angle -= 360;

               if (d.x < 0) d.x += RMULT * SCREENWIDTH;
               if (d.x > RMULT * SCREENWIDTH) d.x -= RMULT * SCREENWIDTH;
               if (d.y < 0) d.y += RMULT * SCREENHEIGHT;
               if (d.y > RMULT * SCREENHEIGHT) d.y -= RMULT * SCREENHEIGHT;
            }
            else {
               d.active = false;
            }
         }
      }
   },


   drawDebris: function () {
      for (var i = 0; i < Debris.length; i++) {
         var d = Debris[i];
         if (d.active) {
            var rangle = (d.angle * Math.PI) / 180.0;
            var x1 = d.x + (d.x1 * Math.cos(rangle) + d.y1 * Math.sin(rangle));
            var y1 = d.y + (d.x1 * Math.sin(rangle) - d.y1 * Math.cos(rangle));
            var x2 = d.x + (d.x2 * Math.cos(rangle) + d.y2 * Math.sin(rangle));
            var y2 = d.y + (d.x2 * Math.sin(rangle) - d.y2 * Math.cos(rangle));

            var shade = Math.floor((255.0 * d.life) / 100.0);
            var color = "rgb(" + shade + "," + shade + "," + shade + ")";

            this.context.strokeStyle = color;
            this.context.beginPath();
            this.context.moveTo(x1 / RMULT, y1 / RMULT);
            this.context.lineTo(x2 / RMULT, y2 / RMULT);
            this.context.stroke();
         }
      }
   },

   drawScore: function () {
      if(GameOver == false || CurrentScore > 0) {
         this.context.font = "Lucidia Console"; 
         this.context.fillStyle = "white"; // Or any color you prefer
         this.context.fillText(CurrentScore, 5, 12); // Position the score at 10 pixels from the left and 20 pixels from the top  
         for(var i=0; i<Ship.lives; i++) {
            let x = 15+i*7;
            let y = 15;
            this.context.strokeStyle = ColorWhite;
            this.context.moveTo(x,y);
            this.context.lineTo(x-3,y+7);
            this.context.lineTo(x+3,y+7);
            this.context.closePath();
            this.context.stroke();
         }
      }
      if(HighScore > 0) {
         this.context.font = "Lucidia Console"; 
         this.context.fillStyle = "white"; // Or any color you prefer
         this.context.fillText(HighScore, 155, 12); // Position the score at 10 pixels from the left and 20 pixels from the top  
      }
   },

   animateGame: function () {
      this.moveRocks();
      this.moveShip();
      this.moveShots();
      this.moveDebris();
      this.moveAlien();
      this.shotsHitSomething();
      this.clearField();
      this.drawScore();
      this.drawRocks();

      if (GameOver == false) {
         if (this.drawShip() == true) {
            this.explodeShip();
         }
      }

      Ship.thrustOn = false;
      this.drawShots();
      this.drawDebris();
      this.drawAlien();
      if (GameOver) {
         this.drawJavaRocks();
      }

      // Produce beat sounds
      if(Ship.active && Rocks.length > 0) {
         // Beat rate changes based on the number of rocks with each level
         let lowLimit = 250 - (50*(RockCount-3));
         let highLimit = 2*lowLimit;
         if(this.beatCount++ == lowLimit) {
            this.beat1Sound.play();
         } else if(this.beatCount++ > highLimit) {
            this.beat2Sound.play()
            this.beatCount = 0;
         }
      }
   },


   drawJavaRocks: function () {
      this.context.strokeStyle = "rgb(255,255,255)";
      for (var i = 0; i <= Larry.length - 1; i++) {
         var x = Larry[i].x;
         var y = Larry[i].y;
         var l = Larry[i].letter;

         var rx = 32 + Math.floor(10 * Math.random());
         var ry = 50 + Math.floor(10 * Math.random());

         this.context.moveTo(rx + (x + l.x[0]) * LScale, ry + (y + l.y[0]) * LScale);
         for (var j = 0; j < l.lines; j++) {
            rx = 32 + Math.floor(6 * Math.random());
            ry = 50 + Math.floor(6 * Math.random());
            this.context.lineTo(rx + (x + l.x[j + 1]) * LScale, ry + (y + l.y[j + 1]) * LScale);
         }
      }
      this.context.closePath();
      this.context.stroke();
   },

};

