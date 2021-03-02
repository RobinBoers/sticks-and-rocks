// The functions in this file control
// the visibility of the multiple menuscreens.

// Get elements from HTML
let gamescreen = document.getElementById('gamescreen');
let menuscreen = document.getElementById('menuscreen');
let creditsscreen = document.getElementById('creditsscreen');
let loadingscreen = document.getElementById('loadingscreen');

// When playbutton is pressed
function play() {
    loadingscreen.style.display = "block";
    creditsscreen.style.display = "none";
    menuscreen.style.display = "none";
    start();
    loadingscreen.style.display = "none";
}

function reset() {
    menuscreen.style.display = "block";
    loadingscreen.style.display = "none";
    creditsscreen.style.display = "block";
    gamescreen.style.display = "block";
}

// Open creditsscreen
function credits() {
    menuscreen.style.display = "none";
}

// Return to menuscreen
function back() {
    menuscreen.style.display = "block";
}

// Hide loading screen when page is fully loaded
window.addEventListener("load", () => {
    loadingscreen.style.display = "none";
});