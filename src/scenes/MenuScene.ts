import * as Phaser from 'phaser';
import { CST } from "../constants"

export default class MenuScene extends Phaser.Scene 
{
    constructor()
    {
        super(CST.SCENES.MENU);
    }

    create()
    {
        let logo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.2, CST.IMAGE.GAME_LOGO)
                           .setDepth(0)
                           .setScale(0.5);

        let startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGE.PLAY).setDepth(1);
        startButton.setScale(0.25);
        startButton.setInteractive();

        startButton.on("pointerover", () => {
            startButton.tint = 0xff0000;
        });

        startButton.on("pointerout", () => {
            startButton.clearTint();
        });

        startButton.on("pointerup", () => {
            this.scene.start(CST.SCENES.PLAY);
        });
                                   
    }
}
