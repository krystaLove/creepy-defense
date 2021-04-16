import * as Phaser from 'phaser';

export default class GameScene extends Phaser.Scene
{
    constructor()
    {
        super("game");
    }

    create() 
    {
        let graphics = this.add.graphics();
        graphics.lineStyle(3, 0xffffff, 1)
        this._drawGrid(graphics);
        console.log("huy");
    }

    private _drawGrid(graphics)
    {
        graphics.lineStyle(1, 0x0000ff, 0.8);
        for(var i = 0; i < 8; i++) {
            graphics.moveTo(0, i * 64);
            graphics.lineTo(640, i * 64);
        }
        for(var j = 0; j < 10; j++) {
            graphics.moveTo(j * 64, 0);
            graphics.lineTo(j * 64, 512);
        }
        graphics.strokePath();
    }
}