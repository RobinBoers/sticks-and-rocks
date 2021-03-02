// The functions in this file control
// the visibility of the multiple menuscreens.

// Get elements from HTML
let gamescreen = document.getElementById('gamescreen');
let menuscreen = document.getElementById('menuscreen');
let creditsscreen = document.getElementById('creditsscreen');
let loadingscreen = document.getElementById('loadingscreen');

var currentButton = "none";

// When playbutton is pressed
function play() {
    click.play();
    onMainMenu = false;
    onMenu = false;
    loadingscreen.style.display = "block";
    creditsscreen.style.display = "none";
    menuscreen.style.display = "none";
    start();
    loadingscreen.style.display = "none";
}

// Hide everything and reset to how
// it was on load. Runs when pressing Q
function reset() {
    exit.play();
    menuscreen.style.display = "block";
    loadingscreen.style.display = "none";
    creditsscreen.style.display = "block";
    gamescreen.style.display = "block";
    onMainMenu = true;
    onMenu = true;
}

// Open creditsscreen
function credits() {
    click.play();
    onMainMenu = false;
    menuscreen.style.display = "none";
}

// Return to menuscreen
function back() {
    onMainMenu = true;
    click.play();
    menuscreen.style.display = "block";
}

// Hide loading screen when page is fully loaded
window.addEventListener("load", () => {
    loadingscreen.style.display = "none";
});

// Show debug info
function debugMode() {
    document.getElementById('debug').style.display ="block"
}

// Runs when player is dead. Hides
// inventory and changes lighting overlay colors.
// Also shows a title in the middle of the screen
function showGameOver() {
    // root.style.setProperty('--circle-size', "0%");
    root.style.setProperty('--overlay-color1', "#8b0000");
    root.style.setProperty('--overlay-color2', "#8b0000");
    document.getElementById("inventory").style.display = "none";
    gameoverscreen.style.display = "block";
}

// Switch currently selected button
// using arrow keys
function selectNextButton() {
    if (onMainMenu) {
        select.play()
        if (currentButton == "none" || currentButton == "credits" || currentButton == "back") {
            currentButton = "play";
            document.getElementById("play-button").classList.add('hover');
            document.getElementById("credits-button").classList.remove('hover');
            // document.getElementById("back-button").classList.remove('hover');
        } else if (currentButton == "play") {
            currentButton = "credits";
            document.getElementById("credits-button").classList.add('hover');
            document.getElementById("play-button").classList.remove('hover');
            // document.getElementById("back-button").classList.remove('hover');
        }
    }
    // else {
    //     currentButton = "back";
    //     document.getElementById("back-button").classList.add('hover');
    // }
}

// Function to remove popup effects and 
// currentButton on hover
function removeButtonFocus() {
    currentButton = "none";
    document.getElementById("play-button").classList.remove('hover');
    document.getElementById("credits-button").classList.remove('hover');
    // document.getElementById("back-button").classList.remove('hover');
}

// Runs when the player hits enter in
// the main menu.
function chooseButton() {
    if (currentButton == "play") {
        play();
    } else if (currentButton == "credits") {
        credits();
    }
    // else if (currentButton == "back") {
    //     back();
    //     currentButton = "credits";
    // }
}