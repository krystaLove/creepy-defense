import * as Phaser from 'phaser';
import { CST } from "../constants";

export default class Tower {
    private TowerImage : Phaser.GameObjects.Image;
    constructor(image:Phaser.GameObjects.Image) {
        this.TowerImage = image;
        this.TowerImage.setScale(CST.CELL_SIZE/this.TowerImage.height);
    }
    getTowerImage(){
        return this.TowerImage;
    }
}