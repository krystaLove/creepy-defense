import * as Phaser from 'phaser';
import { DiagnosticMessage } from 'typescript';
import { CST } from "../../constants";
import Enemy from '../../models/Enemy';
export default class Bullet extends Phaser.GameObjects.Image {
    private dx:number;
    private dy:number;
    private speed:number;
    private bullets;
    private target:Enemy;
    private Angle:number;
    private damage: number = 25;

    constructor(scene: Phaser.Scene){
        super(scene, 0, 0, CST.IMAGE.CULT_TOWER);
        this.dx = 0;
        this.dy = 0;
        this.speed = 0.3;
        this.bullets = scene.add.group({ classType: Bullet, runChildUpdate: true });
    }
    private fire(x,y,angle,enemy){
        this.Angle = angle;
        this.target = enemy;

        this.setActive(true);
        this.setVisible(true);
        this.setPosition(x,y);
        
        this.dx = Math.cos(angle);
        this.dy = Math.sin(angle);
    }
    update(time, delta){
 
        this.x += this.dx * (this.speed * delta);
        this.y += this.dy * (this.speed * delta);
        
        this.Angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
        this.dx = Math.cos(this.Angle);
        this.dy = Math.sin(this.Angle);
        if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) < 10)
        {
            this.setActive(false);
            this.setVisible(false);
            this.target.takeDamage(this.damage);
        }
    }
    public addBullet(x, y, angle, enemy) {
        let bullet = this.bullets.get();
        if (bullet) bullet.fire(x, y, angle, enemy);
    }


}
