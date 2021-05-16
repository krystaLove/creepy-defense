import * as Phaser from 'phaser';
import * as EnemyFactory from '../models/Enemies/EnemyFactory';
import Enemy from '../models/Enemy';
import { CST } from "../constants";

export default class EnemySpawner {

    private mEnemyPool: Enemy[];
    private mPath: Phaser.Curves.Path;
    private mScene: Phaser.Scene;

    private mTimeBetweenSpawnMax: number = 10000;
    private mTimeBetweenSpawnMin: number = 5000;
    private mTimeNextEnemy: number;

    constructor(scene, path){
        this.mPath = path;
        this.mScene = scene;
        this.mEnemyPool = [];
        this.mTimeNextEnemy = 0;
    }

    update(time, delta)
    {
       this._trySpawn(delta);

       this._filterActive();

        this.mEnemyPool.forEach(enemy => {
            enemy.update(time, delta);
        });
    }

    getEnemies(): Enemy[]{
        return this.mEnemyPool;
    }

    private _trySpawn(delta)
    {
        if(!this._canSpawn(delta)) return;

        const enemy: Enemy = EnemyFactory.createRandomEnemy(this.mScene, this.mPath);//EnemyFactory.createEnemy(this.mScene, this.mPath, EnemyFactory.ENEMIES.DOG);
        this.mScene.add.existing(enemy);
        this.mEnemyPool.push(enemy);
        this.mTimeNextEnemy = Math.floor(Math.random() * (this.mTimeBetweenSpawnMax - this.mTimeBetweenSpawnMin)) + this.mTimeBetweenSpawnMin;
        
    }

    private _filterActive(){
        for(let i = this.mEnemyPool.length - 1; i >= 0; --i){
            let enemy = this.mEnemyPool[i];
            if(enemy.isCompleted || !enemy.active){
                this.mEnemyPool.splice(i, 1);
                enemy.destroy();
            }
        }
    }

    private _canSpawn(delta: number): boolean 
    {
        this.mTimeNextEnemy -= delta;
        
        return this.mTimeNextEnemy <= 0;
    }

}