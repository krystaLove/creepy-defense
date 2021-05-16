import * as Phaser from 'phaser';
import { CST } from "../../constants";
import Bullet from './Bullet';

export default class Tower {
    private TowerImage : Phaser.GameObjects.Image;
    private enemies;
    private scene:Phaser.Scene;
    private x:number;
    private y:number;
    private angle:number;
    private range:number;
    private nextTic = 0;

    constructor(image:Phaser.GameObjects.Image, range:number, enemies, x:number, y:number, scene: Phaser.Scene) {
        this.TowerImage = image;
        this.TowerImage.setScale(CST.CELL_SIZE/this.TowerImage.height);
        this.range = range;
        this.enemies = enemies;
        this.x = x;
        this.y = y;
        this.scene = scene;
    }

    update(time, delta){
        if(time > this.nextTic) {
            this.fire();
            this.nextTic = time + 1000;
        }
    }

    private fire(){
        let enemy = this.getEnemy(this.x, this.y, this.range);
        if(enemy) {
                let angle = Phaser.Math.Angle.Between(this.x, this.y, enemy.x, enemy.y);
                let bullet = new Bullet(this.scene);
                bullet.addBullet(this.x, this.y,angle, enemy);
                this.angle = (angle + Math.PI/2) * Phaser.Math.RAD_TO_DEG;
        }
    }
    private getEnemy(x, y, distance) {
        for(var i = 0; i < this.enemies.length; i++) {       
            if(this.enemies[i].active && Phaser.Math.Distance.Between(x, y, this.enemies[i].x, this.enemies[i].y) <= distance)
                return this.enemies[i];
        }
        return false;
    }
    public updateEnemy(enemies){
        this.enemies = enemies;
    }
}
