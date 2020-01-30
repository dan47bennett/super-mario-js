import {loadLevel} from './loaders.js';
import {loadBackgroundSprites, loadMarioSprite} from './sprites.js';
import Compositor from './Compositor.js'
import {createBackgroundLayer} from './layers.js'

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


function createSpriteLayer(sprite, position) {
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, position.x, position.y);
    }
}


Promise.all([
    loadMarioSprite(),
    loadBackgroundSprites(),
    loadLevel('1-1')
])
.then(([marioSprite, sprites, level]) => {
    const comp = new Compositor();


    const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);
    comp.layers.push(backgroundLayer);

    const position = {
        x: 64,
        y: 64
    }

    const spriteLayer = createSpriteLayer(marioSprite, position);
    comp.layers.push(spriteLayer)

    function update() {
        comp.draw(context);
        position.x += 2;
        position.y += 2;
        requestAnimationFrame(update)
    }
    update()
});