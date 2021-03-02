// This file contains the functions
// used to generate random terrain using
// perlin noise

function generateTerrain(MAX_TILES, LAYERS, tileSize, seed) {

    console.log("Generating terrain with seed "+ seed);

    noise.seed(seed);

    let tiles = []

    for (let y = -MAX_TILES; y < MAX_TILES; y += tileSize){
        for (let x = -MAX_TILES; x < MAX_TILES; x += tileSize){

            // let v = parseInt(perlin.get(x, y) * LAYERS);
            let v = parseInt(noise.simplex2(x, y) * LAYERS)

            // console.log(v);

            let texture = "unknown";
            let solid = false;

            if (v !== 0) {
                texture = "grass";
            } else {
                texture = "stone";
                solid = true;
            }

            tiles.push(
                {
                    x: x,
                    y: y,
                    type: texture,
                    solid: solid
                }
            );

        }
    }

    return tiles;
}