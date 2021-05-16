import * as Phaser from 'phaser';
import { CST } from "../constants"
import EnemySpawner from '../models/EnemySpawner';
import Level from '../models/Level';

export default class GameScene extends Phaser.Scene
{

    private path: Phaser.Curves.Path;
    private mEnemySpawner: EnemySpawner;
    private mLevel: Level;

    constructor()
    {
        super(CST.SCENES.PLAY); 
    }

    create() 
    {
        this.mLevel = new Level();
        this.mLevel.getPath();
        
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
        this.path = this.mLevel.getPath();
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