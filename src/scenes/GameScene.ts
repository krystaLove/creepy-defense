import * as Phaser from 'phaser';
import { CST } from "../constants"
import EnemySpawner from '../models/EnemySpawner';

export default class GameScene extends Phaser.Scene
{

    private path: Phaser.Curves.Path;
    private mEnemySpawner: EnemySpawner;

    constructor()
    {
        super(CST.SCENES.PLAY);
    }

    create() 
    {
        let graphics = this.add.graphics();
        graphics.lineStyle(3, 0xffffff, 1)

        this._createPath();
        this._drawGrid(graphics);

        graphics.lineStyle(2, 0xFFFF00, 1);
        this.path.draw(graphics);

        this.mEnemySpawner = new EnemySpawner(this, this.path);
    }

    private _createPath()
    {
        let cs = CST.CELL_SIZE;
        let w = this.renderer.width;
        
        this.path = this.add.path(cs + cs / 2, - cs / 2);
        this.path.lineTo(cs + cs / 2, 164);
        this.path.lineTo(480, 164);
        this.path.lineTo(480, 544);
        this.path.lineTo(w + CST.CELL_SIZE / 2, 544);
    }

    private _drawGrid(graphics)
    {
        let blocksW = this.renderer.width / CST.CELL_SIZE;
        let blocksH = this.renderer.height / CST.CELL_SIZE;
        let cs = CST.CELL_SIZE;

        graphics.lineStyle(1, 0xFFFFFF, 0.8);
        for(var i = 0; i < blocksH; ++i) {
            graphics.moveTo(0, i * cs);
            graphics.lineTo(this.renderer.width, i * 64);
        }
        for(var j = 0; j < blocksW; ++j) {
            graphics.moveTo(j * cs, 0);
            graphics.lineTo(j * cs, this.renderer.height);
        }
        graphics.strokePath();
    }

    update(time, delta)
    {
        this.mEnemySpawner.update(time, delta);
    }
}