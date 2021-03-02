// This file contains the functions
// used to generate random terrain using
// perlin noise

function generateTerrain(MAX_TILES, LAYERS, seed) {

    console.log("Generating terrain with seed "+ seed);

    noise.seed(seed);

    let tiles = []

    for (let y = 0; y < MAX_TILES; y++){
        for (let x = 0; x < MAX_TILES; x++){

            // let v = parseInt(perlin.get(x, y) * LAYERS);
            let v = parseInt(noise.simplex2(x * 10, y * 10) * LAYERS)

            // console.log(v);

            let texture = "unknown";
            let solid = false;
            let topping = "nothing";
            let layer = 1;

            if (v === 0) {
                texture = "stone";
                solid = true;
                layer = 2;
            }
            else if (v == 1) {
                texture = "grass";
                topping = "tree";
                solid = true;
                layer = 1;
            }
            // else if (v == -1) {
            //     texture = "water"
            //     layer = 0;
            // }
            else {
                texture = "grass";
                layer = 1;
            }

            tiles.push(
                {
                    x: x,
                    y: y,
                    type: texture,
                    layer: layer,
                    solid: solid,
                    onTop: topping
                }
            );

        }
    }

    return tiles;
}

// Hide loading screen when page is fully loaded
window.addEventListener("load", () => {
    tiles = generateTerrain(MAX_TILES, 6, seed);
});

function drawTerrain(tiles) {
    for (i = 0; i < tiles.length; i++) {

        let x = tiles[i].x;
        let y = tiles[i].y;
        let type = tiles[i].type;

        let tilesLength = tiles.length;

        // console.log("Loading tile " + i + "["+type+"] at x:" + x + ", y:" + y);        

        let tile = new Image();
        tile.onload = function () {
            ctx.drawImage(
                tile, x * tileSize, y * tileSize, tileSize, tileSize
            );
        }

        tile.src = "assets/images/tiles/" + type + ".png";

        for (let b = 0; b < tilesLength; b++) {
            if (tiles[b].x == tiles[i].x && tiles[b].y == tiles[i].y + 1) {

                // If the tile is higher
                if (tiles[b].layer < tiles[i].layer) {
                    tile.src = "assets/images/tiles/" + type + "_edge.png";
                }
                
                // If the tile is lower
                else if (tiles[b].layer > tiles[i].layer) {
                    tile.src = "assets/images/tiles/" + type + "_shadow.png";

                    // Check for stuff on top (to prevent stupid tress from blocking stuff)
                    if (tiles[i].onTop == "tree") {
                        tile.src = "assets/images/tiles/" + type + "_shadow_tree.png";
                    }

                }
                
                // Check for stuff on top
                else {

                    if (tiles[i].onTop == "tree") {
                        tile.src = "assets/images/tiles/" + type + "_tree.png";
                    } else {
                        tile.src = "assets/images/tiles/" + type + ".png";
                    }

                }
            }
        }
    }
}