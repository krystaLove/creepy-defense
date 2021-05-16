import Enemy from "../Enemy";
import {CST} from "../../constants";

export default class Eye extends Enemy{
    constructor(scene: Phaser.Scene, path: Phaser.Curves.Path)
    {
        super(scene, path, 'eye/eye-0.png');
        
        var frameNamesWalk = this.anims.generateFrameNames(CST.SPRITES.EYE_ATLAS, {start: 0, end: 7, zeroPad: 1, prefix: 'eye-', suffix:'.png'});
        var frameNamesDeath = this.anims.generateFrameNames(CST.SPRITES.EYE_ATLAS, {start: 14, end: 19, zeroPad: 1, prefix: 'eye-', suffix:'.png'});

        this.anims.create({key: 'walk', frames: frameNamesWalk, frameRate: 10, repeat: -1});
        this.anims.create({key: 'death', frames: frameNamesDeath, frameRate: 5, repeat: 1});

        this.anims.play('walk');
        this.setScale(1.5);
    }
}