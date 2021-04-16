import * as Phaser from 'phaser';
import GameScene from './GameScene';

export default class MenuScene extends Phaser.Scene 
{
    constructor()
    {
        super("menu");
    }

    preload()
    {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('start-btn-texture', 'assets/startButton.png');
    }

    create()
    {
        let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.2, "logo")
                           .setDepth(0)
                           .setScale(0.5);

        let startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "start-btn-texture").setDepth(1);
        startButton.setScale(0.25);
        startButton.setInteractive();

        startButton.on("pointerover", () => {
            startButton.tint = 0xff0000;
        });

        startButton.on("pointerout", () => {
            startButton.clearTint();
        });

        startButton.on("pointerup", () => {
            this.scene.start("game");
        });
                                   

        //this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 3, "start-btn-texture").setDepth(1);
    }



}
