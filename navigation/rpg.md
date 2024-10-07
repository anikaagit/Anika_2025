---
layout: base
title: RPG
permalink: /rpg/
---

<canvas id='gameCanvas'></canvas>

<script type="module">
    import GameControl from '{{site.baseurl}}/assets/js/rpg/GameControl.js';

    // Background data
    const imageSrc = "{{site.baseurl}}/images/rpg/castle image.jpg";
    const imageData = {
        pixels: {height: 580, width: 1038}
    };
    const image = {src: imageSrc, data: imageData};

    // Sprite data
    const spriteSrc = "{{site.baseurl}}/images/dragon.png";
    const spriteData = {
        scaleFactor: 4,
        stepFactor: 1000,
        ANIMATION_RATE: 50,
        pixels: {height: 644, width: 573},
        orientation: {rows: 4, columns: 3 },
        down: {row: 0, start: 0, columns: 3 },
        left: {row: 1, start: 0, columns: 3 },
        right: {row: 2, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
    };
    const sprite = {src: spriteSrc, data: spriteData};

    // Assets for game
    //const assets = {}
    //const assets = {image: image}
    //const assets = {sprite: sprite}
    const assets = {image: image, sprite: sprite}

    // Start game engine
    GameControl.start(assets);
</script>
