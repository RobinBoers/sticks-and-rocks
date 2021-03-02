// This file contains the main gameloop

// HTML ELEMENTS

let wrapper = document.getElementById('gamescreen');
var character = document.getElementById("character");
var healtbar = document.getElementById("hpbar");
var overlay = document.getElementById("overlay");
let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');

// VARIABLES & CONSTANTS

// Keycodes
const upKeyCode = 87;
const downKeyCode = 83;
const rightKeyCode = 68;
const leftKeyCode = 65;

const upKeyCode2 = 38;
const downKeyCode2 = 40;
const rightKeyCode2 = 39;
const leftKeyCode2 = 37;

const spaceKeyCode = 32;
const quitKeyCode = 81;
const menuKeyCode = 69;
const creditsKeyCode = 67;
const playKeyCode = 82;
const enterKeyCode = 13;

// Check if the player is on main
// menu. Used for the UI functions
let onMainMenu = true;
let onMenu = true;

// Player health
const maxPlayerHealth = 22;

// CONFIGURATION

// Set grid
let tileSize = 100;
let MAX_TILES = 15;

// Dynamicly set the size of the canvas
canvas.width = canvas.height = MAX_TILES * tileSize;

// Worldgeneration
let tiles;
let seed = Math.random();

// The player and its properties
let player = {
    x: 5,
    y: 5,
    moving: false,
    direction: "down",
    currentDirection: "down",
    directions: { // this is kinda weird, but it just saves which keys are held down
        left: false,
        right: false,
        up: false,
        down: false
    },
    speed: .16, // level 1: .10, level 2: .16, level 3: .18
    spriteSpeed: 7, // level 1: 9, level 2: 7, level 3: 6
    health: maxPlayerHealth,
    hurt: false,
    mana: 5,
    inventory: {
        stone: 0,
        wood: 0
    }
}

// Is the player dead or not?
var gameOver = false;

// Frame counters
var a = 0;                  // for general use
var frameCounter = 7;       // for player sprites
var playerMoveCounter = 0;  // for player movement

// Save at which frame the
// sprite animation is
var spriteFrame = 0;

// Check wether or not the game is loaded before.
// This way the terrain isnt redrawed everytime
// the player clicks the play button
var firstLoad = true;

// Get the screen center. Used to position
// the playersprite and canvas
let camL = window.innerWidth / 2;
let camT = window.innerHeight / 2;

// Overwrite which will stop the
// game if set to true
var stop = true;

// Event listeners for
// keyboard input
window.addEventListener('keydown', onKeydown);
window.addEventListener('keyup', onKeyup);

// GAME LOOP

function start() {

    stop = false;
    a = 0;
    
    // Start gameLoop
    window.requestAnimationFrame(gameLoop);
    
}

function gameLoop() {

    if (firstLoad === true) {

        // Generate and draw terrain
        drawTerrain(tiles);
        firstLoad = false;
    }

    // Overwrite to stop the game
    if (stop) return;

    // Update and draw the frame
    update();
    draw();

    // Request next frame
    window.requestAnimationFrame(gameLoop);
}

// USER INPUT

function onKeydown(e) {

    // Quit game and return to main menu with Q
    if (e.keyCode == quitKeyCode) {
        console.log("Received exit signal. Closing game.");
        stop = true;
        reset();
    }

    // Show credits screen with C (only wokrks on main menu)
    else if (e.keyCode == creditsKeyCode && onMainMenu) {
        credits();
    }
        
    // Start game with R (only wokrks on main menu)
    else if (e.keyCode == playKeyCode && onMainMenu) {
        play();
    }

    // Break the tile the player
    // is looking at
    else if (e.keyCode == spaceKeyCode) {
        breakTile();
    }
    
        
    // Arrow keys
    else if (stop == false) {

        // Player movement (only in-game)
        if (e.keyCode == leftKeyCode || e.keyCode == leftKeyCode2) {
            player.directions.left = true;
        }
        else if (e.keyCode == rightKeyCode || e.keyCode == rightKeyCode2) {
            player.directions.right = true;
        }
        else if (e.keyCode == upKeyCode || e.keyCode == upKeyCode2) {
            player.directions.up = true;
        }
        else if (e.keyCode == downKeyCode || e.keyCode == downKeyCode2) {
            player.directions.down = true;
        }
    } else if (onMenu) {
        
        // Button selection (only on main menu)
        if (e.keyCode == leftKeyCode ||  e.keyCode == leftKeyCode2 || e.keyCode == upKeyCode || e.keyCode == upKeyCode2) {
            selectNextButton()
        }
        else if (e.keyCode == rightKeyCode || e.keyCode == rightKeyCode2 || e.keyCode == downKeyCode || e.keyCode == downKeyCode2) {
            selectNextButton()
        } else if (e.keyCode == enterKeyCode) {
            chooseButton();
        }

    } 
}

function onKeyup(e) {

    // Player movement
    if (e.keyCode == leftKeyCode || e.keyCode == leftKeyCode2) {
        player.directions.left = false;
    }
    else if (e.keyCode == rightKeyCode || e.keyCode == rightKeyCode2) {
        player.directions.right = false;
    }
    else if (e.keyCode == upKeyCode || e.keyCode == upKeyCode2) {
        player.directions.up = false;
    }
    else if (e.keyCode == downKeyCode || e.keyCode == downKeyCode2) {
        player.directions.down = false;
    }

}

// UPDATE

function update() {

    // Simple frame counters
    a = a + 1;
    frameCounter = frameCounter + 1;
    playerMoveCounter = playerMoveCounter + 1;

    // Calculate cords 
    // (the "down" variants round the cords down)
    var playerX = Math.round(player.x);
    var playerY = Math.round(player.y);
    var playerXdown = Math.floor(player.x);
    var playerYdown = Math.floor(player.y);

    // If the playerMoveCounter is at two the
    // player is able to move. This is to prevent
    // sudden quick movement
    if (playerMoveCounter > 2) {

        // Reset the timer
        playerMoveCounter = 0;
        
        // When the player has pressed left
        if (player.directions.left == true) {
        
            for (let c = 0; c < tiles.length; c++) {
                if (tiles[c].x == playerXdown && tiles[c].y == playerY) {

                    let checkCollusion = checkForCollusion(playerXdown, playerY, tileSize, tileSize, tiles[c].x, tiles[c].y, tileSize, tileSize);
                    
                    if ((tiles[c].solid == true && checkCollusion == false) || tiles[c].solid == false) {
                        player.x = player.x - player.speed;
                    }
                }
            }
    
            player.direction = "left";
            player.moving = true;
    
        }
        
        // When the player has pressed right
        // (I know, its bad code, but I'm to lezy to improve it)
        else if (player.directions.right == true) {
    
            for (let c = 0; c < tiles.length; c++) {
                if (tiles[c].x - 1 == playerXdown && tiles[c].y == playerY) {

                    let checkCollusion = checkForCollusion(playerXdown, playerY, tileSize, tileSize, tiles[c].x, tiles[c].y, tileSize, tileSize);
                    
                    if ((tiles[c].solid == true && checkCollusion === false) || tiles[c].solid == false) {
                        player.x = player.x + player.speed;
                    }
                }
            }
    
            player.direction = "right";
            player.moving = true;
    
        }
        
        // When the player has pressed up
        else if (player.directions.up == true) {
    
            for (let c = 0; c < tiles.length; c++) {
                if (tiles[c].x == playerX && tiles[c].y == playerYdown) {

                    let checkCollusion = checkForCollusion(playerX, playerYdown, tileSize, tileSize, tiles[c].x, tiles[c].y, tileSize, tileSize);
                    
                    if ((tiles[c].solid == true && checkCollusion === false) || tiles[c].solid == false) {
                        player.y = player.y - player.speed;
                    }
                }
            }
    
            player.direction = "up";
            player.moving = true;
    
        }
        
        // When the player has pressed down
        else if (player.directions.down == true) {
    
            for (let c = 0; c < tiles.length; c++) {
                if (tiles[c].x == playerX && tiles[c].y - 1 == playerYdown) {

                    let checkCollusion = checkForCollusion(playerX, playerYdown, tileSize, tileSize, tiles[c].x, tiles[c].y, tileSize, tileSize);

                    if ((tiles[c].solid == true && checkCollusion === false) || tiles[c].solid == false) {
                        player.y = player.y + player.speed;
                    }
                }
            }
    
            player.direction = "down";
            player.moving = true;
    
        } else {
            player.moving = false;
        }

    }

    // Substract 1 from player health if the player is
    // hurt. Also play a sound, and make the screen shake
    if (player.hurt) {
        player.hurt = false;
        hurt.play();
        player.health = player.health - 1;
        shake();
    }

    // Make sure the carater doesnt walk out of the map.
    // YEET
    if (player.x < 0) player.x = 0
    if (player.y < 0) player.y = 0
    if (player.x > MAX_TILES + 1) player.x == MAX_TILES;
    if (player.y > MAX_TILES + 1) player.y == MAX_TILES;

    // Check for gameover, if true, stop the game
    // and show the gameoverscreen
    if(player.health <= 0) {
        gameOver = true;
        stop = true;
        dead.play()
    }

}

// DRAW

function draw() {

    // Make sure the pixelart
    // isn't ruined
    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;

    // Get screen center
    // Used to position the player and canvas
    camL = window.innerWidth / 2;
    camT = window.innerHeight / 2;

    // canvas.style.transform = `translate( ${-player.x*tileSize + camL}px, ${-player.y*tileSize + camT}px)`;

    // Position the player and canvas at
    // the center of the screen

    // The canvas is moving based on the player location
    // this way I create the illusion of a walking player
    // while the player stays in the same position
    canvas.style.left = `${-player.x * tileSize + camL}px`;
    canvas.style.top = `${-player.y*tileSize + camT}px`
    character.style.width = tileSize + "px";

    character.style.top = `${camT}px`;
    character.style.left = `${camL}px`;

    // Healthbar. It changes based
    // on the players' health (duh)
    healtbar.src = "assets/images/ui/healthbar/" + player.health + ".png";

    // If the frameCounter is at a specific number
    // (is dependent on player spriteSpeed) the game
    // will render the next frame of the animated player sprite.
    // This is done to prevent a super speedy sprite :)
    if (frameCounter > player.spriteSpeed) {

        // But only if the player is actually moving
        if (player.moving) {

            // Also increase the framenum
            spriteFrame = spriteFrame + 1;

            // If it is at the las frame of the animation
            // = 2 in this case, it will go back to the beginning
            if (spriteFrame > 2) {
                spriteFrame = 1;
            }


            // Choose the correct sprite based on
            // the direction the player is walking
            if (player.direction == "up") {

                character.src = "assets/images/sprites/animation/back" + spriteFrame + ".png";  
                player.currentDirection = "up";

            } else if (player.direction == "down") {

                character.src = "assets/images/sprites/animation/front" + spriteFrame + ".png";
                player.currentDirection = "down";

            } else if (player.direction == "left") {

                character.src = "assets/images/sprites/animation/left-side" + spriteFrame + ".png";
                player.currentDirection = "left";

            } else {

                character.src = "assets/images/sprites/animation/side" + spriteFrame + ".png";
                player.currentDirection = "right";

            }
   
        }

        // Reset framecounter to start the process again
        frameCounter = 0;
    }

    // Calculate cords (for in the debug menu)
    var cordX = Math.floor(player.x);
    var cordY = Math.floor(player.y);

    // Put info into debug menu
    document.getElementById('coords').innerText = "x:" + cordX + ",y:" + cordY;
    document.getElementById('framecount').innerText = a;

    // Update inventory
    document.getElementById('inv-wood').innerText = player.inventory.wood;
    document.getElementById('inv-stone').innerText = player.inventory.stone;

    // Draw Game-Over screen when game is over (duh)
    if (gameOver === true || stop === true) {
        showGameOver();
    }

    // If the player has health below 5, make 
    // the lighting overlay red (like Heroes of the Storm :D )
    if (player.health < 5) {
        root.style.setProperty('--overlay-color2', "#8b0000");
    } else {
        root.style.setProperty('--overlay-color2', "#000000");
    }

}

// Hope you enjoyed reading all of that code :D
// - Robin