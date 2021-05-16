import * as Phaser from 'phaser';
import Enemy from "../models/Enemy";
import { CST } from "../constants";

export default class EnemySpawner {

    private mEnemyPool: Enemy[] = [];
    private mPath: Phaser.Curves.Path;
    private mScene: Phaser.Scene;

    private mTimeBetweenSpawn: number = 5000;
    private mTimeNextEnemy: number = 0;

    constructor(scene, path){
        this.mPath = path;
        this.mScene = scene;
    }

    update(time, delta)
    {
       this._trySpawn(time);

       this._filterActive();

        this.mEnemyPool.forEach(enemy => {
            enemy.update(time, delta);
        });
    }

    getEnemies(): Enemy[]{
        return this.mEnemyPool;
    }

    private _trySpawn(time)
    {
        if(this._canSpawn(time)){
            console.log(this.mEnemyPool.length + " - size of enemy pool");
            const enemy: Enemy = new Enemy(this.mScene, this.mPath);
            this.mScene.add.existing(enemy);
            this.mEnemyPool.push(enemy);
            this.mTimeNextEnemy += 3000;
        }
    }

    private _filterActive(){
        this.mEnemyPool = this.mEnemyPool.filter(enemy => enemy.active);
    }

    private _canSpawn(time: number): boolean 
    {
        return time > this.mTimeNextEnemy;
    }

}