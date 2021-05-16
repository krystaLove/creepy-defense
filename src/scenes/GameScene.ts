import * as Phaser from 'phaser';
import { CST } from "../constants"
import { game } from '../main';
import EnemySpawner from '../models/EnemySpawner';
import Tower from '../models/Tower';

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
        let self = this;
        let graphics = this.add.graphics();
        graphics.lineStyle(3, 0xffffff, 1)

        this._createPath();
        this._drawGrid(graphics);
        this.makeHud();
        
        graphics.lineStyle(2, 0xFFFF00, 1);
        this.path.draw(graphics);
        
        this.place_tower_images(CST.CELL_SIZE * 8, CST.CELL_SIZE * 14 + 10);
        this.mEnemySpawner = new EnemySpawner(this, this.path);
        

        //Логика для "башней", пока хер знает куда это пихать кроме как сюда
        
    
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY; 
        });
        
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.destroy();
            gameObject.setScale(CST.CELL_SIZE / gameObject.height);
            gameObject.input.enabled = false;
            self.setTower(dropZone.x, dropZone.y, gameObject.texture.key);
            let image = self.add.image(gameObject.input.dragStartX, gameObject.input.dragStartY, gameObject.texture.key).setInteractive();
            self.input.setDraggable(image);
            console.log(gameObject);
            
            image.setScale(CST.CELL_SIZE*2/gameObject.width);
            gameObject.destroy();
        });
    
        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        });

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
            this.add.zone(0, i * cs, blocksH, blocksW).setRectangleDropZone(blocksH, blocksW);
            graphics.moveTo(j * cs, 0);
            graphics.lineTo(j * cs, this.renderer.height);
        }
        graphics.strokePath();


        //dropZones
        for(var i = 0; i < blocksH * 2; ++i){
            for(var j = 0; j < blocksW * 2 - 47; ++j)
            this.makeDropZone(cs/2 + i*cs, cs/2 + j*cs);
        }
        
    }

    update(time, delta)
    {
        this.mEnemySpawner.update(time, delta);
    }
    
    place_tower_images(x, y){
        for(let prop in CST.IMAGE_T){
            let image = this.add.image(x, y, CST.IMAGE_T[prop]).setInteractive();
            this.input.setDraggable(image);
            image.setScale(CST.CELL_SIZE*2/image.height);
            x += CST.CELL_SIZE * 5;
        }
    }

    makeDropZone(x, y){
        let cs = CST.CELL_SIZE;
        let zone = this.add.zone(x, y, cs, cs).setRectangleDropZone(cs, cs);

        let graphics = this.add.graphics();
        graphics.lineStyle(1, 0xFF3FFF, 1);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    }


    makeHud(){
        let graphics = this.add.graphics();
        graphics.fillStyle(0x666666, 1.0);
        graphics.fillRect(0, 5 + this.renderer.height/CST.CELL_SIZE * 54, CST.CELL_SIZE * this.renderer.height, CST.CELL_SIZE * 4);

        //levels
        let lvl = 1;
        let level = this.add.text(this.renderer.height/CST.CELL_SIZE * 8, 5 + this.renderer.height/CST.CELL_SIZE * 57, 'Level: 1', { font: '48px Arial' });
        const lvlUp = this.add.image(this.renderer.height/CST.CELL_SIZE * 4, this.renderer.height/CST.CELL_SIZE * 59,CST.IMAGE.ARROW).setInteractive()
        .on('pointerdown', () => level.setText('Level: ' + ++lvl));
        lvlUp.setScale(0.1);
        
    }

    setTower(x, y, img){
        let tower =  new Tower(this.add.image(x, y, img).setInteractive());   
    }
}