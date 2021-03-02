// This function contains utility functions for the gameplay

// This function checks if the player overlaps with a 
// given tile. Used for movement
function checkForCollusion(playerX, playerY, playerWidth, playerHeight, tileX, tileY, tileWidth, tileHeight) {
    if (playerX < tileX + tileWidth  && playerX + playerWidth  > tileX &&
    playerY < tileY + tileHeight && playerY + playerHeight > tileY) {
        return true;
    }
    return false;
}


// Function to break tiles. It cilces to all tiles,
// until it has found the right tile (depending on the direction)
// the player is looking.
function breakTile() {

    const tilesLength = tiles.length;

    if (player.currentDirection == "up") {

        for (t = 0; t < tilesLength; t++) {
            if (tiles[t].x == Math.round(player.x) && tiles[t].y == Math.round(player.y) - 1) {

                if (canRemoveTile(tiles[t])) { tiles[t] = removeTile(tiles[t]); drawTerrain(tiles) }
                // else { error.play() }

            }
        }
    } else if (player.currentDirection == "down") {
        for (t = 0; t < tilesLength; t++) {
            if (tiles[t].x == Math.round(player.x) && tiles[t].y == Math.round(player.y) + 1) {
                
                if (canRemoveTile(tiles[t])) { tiles[t] = removeTile(tiles[t]); drawTerrain(tiles) }
                // else { error.play() }

            }
        }
    } else if (player.currentDirection == "left") {
        for (t = 0; t < tilesLength; t++) {
            if (tiles[t].x == Math.round(player.x) - 1 && tiles[t].y == Math.round(player.y)) {
                
                if (canRemoveTile(tiles[t])) { tiles[t] = removeTile(tiles[t]); drawTerrain(tiles) }
                // else { error.play() }
            }
        }
    } else {
        for (t = 0; t < tilesLength; t++) {
            if (tiles[t].x == Math.round(player.x) + 1 && tiles[t].y == Math.round(player.y)) {
                
                if (canRemoveTile(tiles[t])) { tiles[t] = removeTile(tiles[t]); drawTerrain(tiles) }
                // else { error.play() }

            }
        }
    }
}


// Check if the tile can be removed
// if not, dont remove it to prevent lag
function canRemoveTile(tile) {

    if (tile.onTop !== "nothing" || tile.type == "stone") {
        return true;
    }
    else {
        return false;
    }

}

// Remove tiles by setting them to another type.
// Accepts a tile (object), and returns the 
// same object, but updated
function removeTile(tile) {

    // When there is a tree on top, remove it
    // and give the player wood (random, between 1 and 3)
    if (tile.onTop !== "nothing") {
        tile.onTop = "nothing";
        tile.solid = false;
        success = true;

        player.inventory.wood = player.inventory.wood + randomInt(3);
    }

    // When the tile is stone, change it into grass
    else if(tile.type == "stone") {
        tile.type = "grass";
        tile.solid = false;
        tile.layer = tile.layer - 1;

        player.inventory.stone = player.inventory.stone + randomInt(3);
    }

    // When it is grass, turn it into water
    // else if (tiles[t].type == "grass") {
    //     tiles[t].type = "water";
    //        drawTerrain(tiles);
    // }

    // Play audio effect
    punch.play()

    // Return the updated tile info
    return tile;

}


// Function to shak the screen
// used when getting damage
// uses a css class to create the effect
function shake() {
    wrapper.setAttribute( "class", "main shake" );
    setTimeout( function() {
        wrapper.setAttribute( "class", "main" );
    }, 500);
}


// Generate a random interger between 1
// and a other int. Used for random drops
function randomInt(max) {
    return Math.floor(Math.random() * max) + 1  
}