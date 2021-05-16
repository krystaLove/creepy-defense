import * as Phaser from 'phaser';
import { CST } from "../constants"

export default class EndGameScene extends Phaser.Scene 
{
    constructor()
    {
        super(CST.SCENES.END);
    }

    create()
    {
        let logo = this.add.image(CST.CELL_SIZE * 7, this.game.renderer.height * 0.2, CST.IMAGE.GAME_LOGO)
                           .setDepth(0)
                           .setScale(0.5);
        let gameoverLogo = this.add.image(CST.CELL_SIZE * 7, CST.CELL_SIZE * 7, CST.IMAGE.GAMEOVER).setDepth(0);
        let restartButton = this.add.image(CST.CELL_SIZE * 7, CST.CELL_SIZE * 10, CST.IMAGE.RESTART).setDepth(1);
        
        restartButton.setScale(0.3);
        restartButton.setInteractive();

        restartButton.on("pointerout", () => {
            restartButton.clearTint();
        });

        restartButton.on("pointerup", () => {
            this.scene.start(CST.SCENES.PLAY);
        });
                                   
    }
}
