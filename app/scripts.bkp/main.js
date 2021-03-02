// This file contains the main gameloop

// HTML ELEMENTS

var character = document.getElementById("character");
let canvas = document.getElementById('game');
canvas.width = canvas.height = 1600;
let ctx = canvas.getContext('2d');

// VARIABLES & CONSTANTS

// Keycodes
const upKeyCode = 87;
const downKeyCode = 83;
const rightKeyCode = 68;
const leftKeyCode = 65;

const quitKeyCode = 81;
const menuKeyCode = 69;
const creditsKeyCode = 67;
const playKeyCode = 82;

const maxPlayerHealth = 20;

// CONFIGURATION

// Set zoomlevel and tilesize
const ZOOMLEVEL = 10;
let tileSize = canvas.width / ZOOMLEVEL;

// Worldgen
let tiles;
let seed = 123456;

// Player movement and location
let player = {
    x: tileSize * 4,
    y: tileSize * 2,
    moving: false,
    direction: "right",
    health: maxPlayerHealth,
    mana: 5
}

// Keyboard input 
let pressedKeys = {};

var gameOver = false;
var i;
var frameCounter = 0;

// Overwrite which will stop the
// game if set to true
var stop = false;

// Event listeners for
// keyboard input
window.addEventListener('keydown', onKeydown);
window.addEventListener('keyup', onKeyup);

// GAME LOOP

function start() {

    stop = false;

    // Generate terrain
    tiles = generateTerrain(20 * tileSize, 6, tileSize, seed);

    // Start gameLoop
    window.requestAnimationFrame(gameLoop);
    
}

function gameLoop() {

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
    else if (e.keyCode == creditsKeyCode && stop == true) {
        credits();
    }
        
    // Start game with R (only wokrks on main menu)
    else if (e.keyCode == playKeyCode && stop == true) {
        play();
    }

    // Player movement
    else if (e.keyCode == leftKeyCode) {
        player.x = player.x - tileSize;
    }
    else if (e.keyCode == rightKeyCode) {
        player.x = player.x + tileSize;
    }
    else if (e.keyCode == upKeyCode) {
        player.y = player.y - tileSize;
    }
    else if (e.keyCode == downKeyCode) {
        player.y = player.y + tileSize;
    }
}

function onKeyup(e) {
}

// UPDATE

function update() {

    // Simple frame count
    i = i+1;
    frameCounter = frameCounter + 1;

    let camera_left = canvas.width / 2;

    canvas.style.transform = `translate3d( ${-player.x+camera_left}px, ${-player.y}px, 0 )`;
    // character.style.transform = `translate3d( ${player.x + tileSize/4}px, ${player.y + tileSize/4}px, 0 )`; 

    character.style.width = tileSize / 2 + "px";
    
    character.style.left = camera_left + tileSize / 4 + "px";
    character.style.top = tileSize * 2 + tileSize / 8 + "px";

    // Check for gameover
    if(player.health <= 0) {
        gameOver = true;
        stop = true;
    }

}

// DRAW

function draw() {

    // Make sure the pixelart
    // isn't ruined
    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;

    // console.log("Loading " + tiles.length + " tiles");

    // Draw terrain
    for (i = 0; i < tiles.length; i++) {

        let x = tiles[i].x;
        let y = tiles[i].y;
        let type = tiles[i].type;

        // console.log("Loading tile " + i + "["+type+"] at x:" + x + ", y:" + y);        

        let tile = new Image();
        tile.onload = function () {
            ctx.drawImage(
                tile, x, y, tileSize, tileSize
            );
        }
        tile.src = "assets/images/tiles/" + type + ".png";

    }

    // Draw Game-Over screen when game is over (duh)
    if(gameOver === true || stop === true) {
        ctx.fillStyle = 'white';
        ctx.font = '96px JetBrains Mono';
        ctx.fillText('G4me 0v3r!', 120, 300);
    }
}