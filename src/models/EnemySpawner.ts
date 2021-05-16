import * as Phaser from 'phaser';
import * as EnemyFactory from '../models/Enemies/EnemyFactory';
import Enemy from '../models/Enemy';
import { CST } from "../constants";
import { textChangeRangeIsUnchanged } from 'typescript';

export default class EnemySpawner {

    private mEnemyPool: Enemy[] = [];
    private mPath: Phaser.Curves.Path;
    private mScene: Phaser.Scene;

    private mTimeBetweenSpawnMax: number = 10000;
    private mTimeBetweenSpawnMin: number = 5000;
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
        console.log(this.mTimeNextEnemy);   
        if(this._canSpawn(time)){
            console.log(this.mEnemyPool.length + " - size of enemy pool");
            const enemy: Enemy = EnemyFactory.createRandomEnemy(this.mScene, this.mPath);//EnemyFactory.createEnemy(this.mScene, this.mPath, EnemyFactory.ENEMIES.DOG);
            this.mScene.add.existing(enemy);
            this.mEnemyPool.push(enemy);
            this.mTimeNextEnemy += Math.floor(Math.random() * (this.mTimeBetweenSpawnMax - this.mTimeBetweenSpawnMin)) + this.mTimeBetweenSpawnMin;
        }
    }

    private _filterActive(){
        this.mEnemyPool = this.mEnemyPool.filter(enemy => enemy.active);
    }

    private _canSpawn(time: number): boolean 
    {
        let res = time > this.mTimeNextEnemy;
        
        return res;
    }

}