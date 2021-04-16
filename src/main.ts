import * as Phaser from 'phaser';

import MenuScene from "./scenes/MenuScene";
import PreloaderScene from "./scenes/PreloaderScene";
import GameScene from "./scenes/GameScene";

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Creepy Defenser',
 
  type: Phaser.AUTO,
 
  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
 
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  scene : [PreloaderScene, MenuScene, GameScene],
  parent: 'game',
  backgroundColor: '#000000',
};
 
export const game = new Phaser.Game(gameConfig);