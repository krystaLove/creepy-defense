import * as Phaser from 'phaser';
import { CST } from "../constants";

export default class Enemy extends Phaser.GameObjects.Sprite {
    private mFollower = {t: 0, vec: new Phaser.Math.Vector2()};
    private mPath: Phaser.Curves.Path;

    private mEnemySpeed: number = 1 / 50000;
    public isDead = false;

    private mHp = 50;

    constructor(scene: Phaser.Scene, path: Phaser.Curves.Path, imageProp = CST.IMAGE.CULT_TOWER)
    {
        super(scene, 0, 0, imageProp);
        this.mPath = path;
        this.setScale(1.5);
        this.startOnPath();
    }

    update(time, delta)
    {
        this.mFollower.t += this.mEnemySpeed * delta;            
        this.mPath.getPoint(this.mFollower.t, this.mFollower.vec);

        if(this.mFollower.vec.x > this.x && !this.flipX){
            this.toggleFlipX();
        }
        
        this.setPosition(this.mFollower.vec.x, this.mFollower.vec.y);
        if (this.mFollower.t >= 1)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }

    startOnPath()
    {
        this.mFollower.t = 0;
        this.mPath.getPoint(this.mFollower.t, this.mFollower.vec);
            
        this.setPosition(this.mFollower.vec.x, this.mFollower.vec.y);            
    }

    takeDamage(dmg: number){
        this.mHp -= dmg;
        this._tintEnemy();
        if(this.mHp <= 0){
            this._onDeath();
        }
    }

    protected _onDeath(){
        this.anims.stop();
        this.isDead = true;

        this.mEnemySpeed = 0;
        this.alpha = 0;
        let sprite: Phaser.GameObjects.Sprite = this as Phaser.GameObjects.Sprite;

        if(this.anims.exists('death')){
            this.anims.play('death');
        }

        this.scene.add.tween({
            targets: [sprite],
            ease: 'Sine.easeInOut',
            duration: 1200,
            delay: 0,
            alpha: {
              getStart: () => 1,
              getEnd: () => 0
            },
            onComplete: () => {
                this.setActive(false);
                this.setVisible(false);
            }
          });
        
    }

    private _tintEnemy(){
        this.setTint(0xFF0000);
        this.scene.time.delayedCall(300, () => {
            this.clearTint();
        })
    }

}

/* Phaser.GameObjects.GameObjectFactory.register(
    'enemy',
    function (this: Phaser.GameObjects.GameObjectFactory, scene: Phaser.Scene, path: Phaser.Curves.Path) {
        const enemy = new Enemy(this.scene, path);

        this.displayList.add(enemy);
        this.updateList.add(enemy);
        return enemy;
    }
) */