import Enemy from "../Enemy";
import {CST} from "../../constants";

export default class Dog extends Enemy{
    constructor(scene: Phaser.Scene, path: Phaser.Curves.Path)
    {
        super(scene, path, 'dog1/dog-0.png');
        
        var frameNames = this.anims.generateFrameNames(CST.SPRITES.DOG_ATLAS, {start: 0, end: 4, zeroPad: 1, prefix: 'dog-', suffix:'.png'});
        this.anims.create({key: 'walk', frames: frameNames, frameRate: 10, repeat: -1});
        this.anims.play('walk');
        this.setScale(1.5);
    }
}