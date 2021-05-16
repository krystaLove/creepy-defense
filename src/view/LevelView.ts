import Level from "../models/Level";
import GameScene from "../scenes/GameScene";
import { CST } from "../constants";

export default class LevelView {
    private mTileMap: Phaser.Tilemaps.Tilemap;
    private mGameScene: GameScene;
    private mLevelData: Level;

    constructor(scene, levelData){
        this.mGameScene = scene;
        this.mLevelData = levelData;
    }

    loadView(){
        this.mTileMap = this.mGameScene.make.tilemap({tileWidth: CST.CELL_SIZE, tileHeight: CST.CELL_SIZE, width: 1000, height: 720});
        let tileSet = this.mTileMap.addTilesetImage(CST.TILES.LEVEL_TILES, CST.TILES.LEVEL_TILES, 16, 16);

        let layer = this.mTileMap.createBlankLayer("level-layer", tileSet);
        
        let data = this.mLevelData.getLevelData();

        for(let i = 0; i < CST.MAP_WIDTH; ++i){
            for(let j = 0; j < CST.MAP_HEIGHT; ++j){
                if(data[j][i] == 0){
                    layer.putTileAt(Math.floor(Math.random() * 2 + 18), i, j);
                } else {
                    layer.putTileAt(28 , i, j);
                }
            }
        }
    }
    
}