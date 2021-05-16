import * as Phaser from 'phaser';
import { CST } from "../constants"
import EnemySpawner from '../models/EnemySpawner';
import Level from '../models/Level';
import Hud from '../view/Hud';
import LevelView from '../view/LevelView';
import Tower from "../models/Towers/Tower";

export default class GameScene extends Phaser.Scene
{

    private path: Phaser.Curves.Path;
    private mEnemySpawner: EnemySpawner;
    private mLevel: Level;
    private mLevelView: LevelView;
    private mHud: Hud;

    private towers: Tower[] = [];

    private mPlayerHpText;
    private mPlayerHP: number = 30;

    constructor()
    {
        super(CST.SCENES.PLAY); 
    }

    create() 
    {
        this.mLevel = new Level();
        this.mLevelView = new LevelView(this, this.mLevel);
        this.mLevelView.loadView();
        this.mHud = new Hud(this, this.mLevel);
        this.mHud.makeHud();

        this.mPlayerHpText = this.add.text(CST.CELL_SIZE/3, CST.CELL_SIZE * 12, 'HP: ' + this.mPlayerHP,{ font: '46px Arial' });
        let graphics = this.add.graphics();
        graphics.lineStyle(3, 0xffffff, 1)

        this._createPath();
        //this._drawGrid(graphics);

        graphics.lineStyle(2, 0xFFFF00, 1);
        //this.path.draw(graphics);

        this.mEnemySpawner = new EnemySpawner(this, this.path);
    }

    private _createPath()
    {
        this.path = this.mLevel.getPath();
    }

    private _drawGrid(graphics)
    {
        let cs = CST.CELL_SIZE;

        graphics.lineStyle(1, 0xFFFFFF, 0.8);
        for(var i = 0; i < CST.MAP_HEIGHT; ++i) {
            graphics.moveTo(0, i * cs);
            graphics.lineTo(this.renderer.width, i * 64);
        }
        for(var j = 0; j < CST.MAP_WIDTH; ++j) {
            graphics.moveTo(j * cs, 0);
            graphics.lineTo(j * cs, this.renderer.height);
        }
        graphics.strokePath();
    }

    update(time, delta)
    {
        this.mEnemySpawner.update(time, delta);

        this.towers.forEach(tower => {
            tower.update(time, delta);
            tower.updateEnemy(this.mEnemySpawner.getEnemies());
        });
    }

    setTower(x, y, img){
        let cs = CST.CELL_SIZE;

        this.mLevel.setTower((x - cs / 2) / cs, (y - cs / 2) / cs);
        let tower =  new Tower(this.add.image(x, y, img).setInteractive(), 300, this.mEnemySpawner.getEnemies(),x,y, this);
        this.towers.push(tower);
    }

    playerTakeDamage(dmg: number){
        this.mPlayerHP -= dmg;
        this.mPlayerHpText.setText('HP: ' + this.mPlayerHP);
        if(this.mPlayerHP <= 0){
            //lorum
        }
    }
}