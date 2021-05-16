import Enemy from "../Enemy";
import {CST} from "../../constants";

export default class Bigboy extends Enemy{
    constructor(scene: Phaser.Scene, path: Phaser.Curves.Path)
    {
        super(scene, path, 'bigboy_walk/bigboy_walk-0.png');
        
        var frameNamesWalk = this.anims.generateFrameNames(CST.SPRITES.BIGBOY_ATLAS, {start: 0, end: 8, zeroPad: 1, prefix: 'bigboy_walk-', suffix:'.png'});
        var frameNamesDeath = this.anims.generateFrameNames(CST.SPRITES.BIGBOY_ATLAS, {start: 0, end: 9, zeroPad: 1, prefix: 'bigboy_death-', suffix:'.png'});

        this.anims.create({key: 'walk', frames: frameNamesWalk, frameRate: 10, repeat: -1});
        this.anims.create({key: 'death', frames: frameNamesDeath, frameRate: 10, repeat: -1});

        this.anims.play('walk');
        this.setScale(1.1);
    }
}