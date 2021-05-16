import * as Phaser from "phaser";
import { CST } from "../constants"

export default class PreloaderScene extends Phaser.Scene 
{
    constructor()
    {
        super(CST.SCENES.LOAD);
    }

    private _loadImages()
    {
        this.load.setPath("./assets/image");

        for(let prop in CST.IMAGE){
            this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
        }
    }

    private _loadTiles()
    {
        this.load.setPath("./assets/tiles");

        for(let prop in CST.TILES){
            this.load.image(CST.TILES[prop], CST.TILES[prop]);
        }
    }

    private _loadAtlases()
    {
        this.load.setPath("./assets/sprites");

        for(let prop in CST.SPRITES){
            this.load.multiatlas(CST.SPRITES[prop], `${CST.SPRITES[prop]}`);
        }
    }

    private _loadSounds()
    {
        this.load.setPath("./assets/sounds");
        for(let prop in CST.AUDIO){
            this.load.audio(CST.AUDIO[prop], `${CST.AUDIO[prop]}`);
        }
    }

    preload() 
    {
        this._loadImages();
        this._loadTiles();
        this._loadAtlases();
        this._loadSounds();

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        });

        this.load.on("progress", (progress: number) => {
            loadingBar.fillRect(0, this.renderer.height / 2, this.game.renderer.height * progress, 50);
        });

        this.load.on("load", (file: Phaser.Loader.File) => {
            console.log(file.src);
        });

    }

    create()
    {
        this.scene.start(CST.SCENES.MENU);
    }
}