import { CST } from "../constants";

export default class Level{

    private mLevelData: number[][];
    private mPath: Phaser.Curves.Path = new Phaser.Curves.Path();

    constructor(){
        this._generateLevel();
    }

    public getPath(): Phaser.Curves.Path{
        return this.mPath;
    }

    public getLevelData(): number[][]{
        return this.mLevelData;
    }

    private _generateLevel(){
        let w = CST.MAP_WIDTH;
        let h = CST.MAP_HEIGHT;

        this.mLevelData = [];

        for(let i = 0; i < h; ++i){
            let line: number[] = [];
            for(let j = 0; j < w; ++j){
                line.push(0);
            }
            this.mLevelData.push(line);
        }

        this.mLevelData[0][0] = 1;
        this.mPath.moveTo(this._getPixelsFromPosition(1), this._getPixelsFromPosition(1));

        let anchorPoints: number[] = [0];

        for(let i = 1; i < w; ++i){
            let rndVal = Math.floor(Math.random() * h);
            anchorPoints.push(rndVal);
            this.mLevelData[rndVal][i] = 1;
        }

        let curH = 0;

        for(let i = 1; i < w; ++i){
            let nextH = anchorPoints[i];
            while(curH > nextH){
                curH--;
                this.mLevelData[curH][i - 1] = 1;
            }

            while(curH < nextH){
                curH++;
                this.mLevelData[curH][i - 1] = 1;
            }

            this.mPath.lineTo(this._getPixelsFromPosition(i), this._getPixelsFromPosition(curH + 1));
            this.mPath.lineTo(this._getPixelsFromPosition(i + 1), this._getPixelsFromPosition(curH + 1));
        }
        console.log(anchorPoints);
        console.log(this.mLevelData);
    }

    private _getPixelsFromPosition(pos): number{
        return pos * CST.CELL_SIZE -CST.CELL_SIZE / 2;
    }

}