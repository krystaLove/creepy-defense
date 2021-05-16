import * as Phaser from 'phaser';
import { CST } from "../constants";
import Level from '../models/Level';

export default class Hud {
    private mScene;
    private mMap: Level;
    private mDropZoneGraphics: Phaser.GameObjects.Graphics;

    private isDropZoneDrown = false;

    constructor(scene, map){
        this.mScene = scene;
        this.mMap = map;

        this._inputSubscribe();
    }

    private _inputSubscribe(){
        let localScene = this.mScene;
        let self = this;

        this.mScene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            self._drawDropZone();
        });
        
        this.mScene.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.destroy();
            gameObject.setScale(CST.CELL_SIZE / gameObject.height);
            gameObject.input.enabled = false;
            
            localScene.setTower(dropZone.x, dropZone.y, gameObject.texture.key);

            let image = localScene.add.image(gameObject.input.dragStartX, gameObject.input.dragStartY, gameObject.texture.key).setInteractive();

            localScene.input.setDraggable(image);
            console.log(gameObject);
            
            image.setScale(CST.CELL_SIZE * 1.5 / gameObject.width);
            gameObject.destroy();

            self._clearDropZone();
            
        });
    
        this.mScene.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
            self._clearDropZone();
        });
    }

    public makeHud(){
        let graphics = this.mScene.add.graphics();
        graphics.fillStyle(0x666666, 1.0);
        graphics.fillRect(0, 700, 1000, 500);

        //levels
       /* let lvl = 1;
        let level = this.add.text(this.renderer.height/CST.CELL_SIZE * 8, 5 + this.renderer.height/CST.CELL_SIZE * 57, 'Level: 1', { font: '48px Arial' });
        const lvlUp = this.add.image(this.renderer.height/CST.CELL_SIZE * 4, this.renderer.height/CST.CELL_SIZE * 59,CST.IMAGE.ARROW).setInteractive()
        .on('pointerdown', () => level.setText('Level: ' + ++lvl));
        lvlUp.setScale(0.1);*/
        
        this._handleTowerImage(CST.IMAGE.CULT_TOWER);
    }

    private _drawDropZone(){
        if(this.isDropZoneDrown)
            return;

        this.isDropZoneDrown = true;
        let cs = CST.CELL_SIZE;
        this.mDropZoneGraphics = this.mScene.add.graphics();

        for(var i = 0; i < CST.MAP_WIDTH; ++i){
            for(var j = 0; j < CST.MAP_HEIGHT; ++j){
                if(this.mMap.isEmpty(i, j))
                    this._makeDropZone(cs / 2 + i * cs, cs / 2 + j * cs);
            }   
        }
    }

    private _clearDropZone(){
        this.mDropZoneGraphics.destroy();
        this.isDropZoneDrown = false;
    }

    private _handleTowerImage(prop){
        let x = CST.CELL_SIZE * 3;

        let image = this.mScene.add.image(x, CST.CELL_SIZE * 11.5, prop).setInteractive();

        this.mScene.input.setDraggable(image);
        image.setScale(CST.CELL_SIZE*1.3/image.height);
        x += CST.CELL_SIZE * 2.7;
    }

    private _makeDropZone(x, y){
        let cs = CST.CELL_SIZE;
        let zone = this.mScene.add.zone(x, y, cs, cs).setRectangleDropZone(cs, cs);

        this.mDropZoneGraphics.lineStyle(1, 0xFFFFFF, 1);
        this.mDropZoneGraphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    }
}