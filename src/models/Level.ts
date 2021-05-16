import { CST } from "../constants";

export default class Level{

    private mLevelData: number[][];
    private mPath: Phaser.Curves.Path = new Phaser.Curves.Path();

    constructor(){
        this._generateLevel();
    }

    public setTower(x, y){
        this.mLevelData[y][x] = 2;
    }

    public isEmpty(x , y): boolean {
        return this.mLevelData[y][x] == 0;
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
        this.mPath.moveTo(this._getPixelsFromPosition(0), this._getPixelsFromPosition(-1));

        let anchorPoints: number[] = [];

        for(let i = 1; i < w; i += 2){
            let rndVal = Math.floor(Math.random() * h);
            anchorPoints.push(rndVal);

            this.mLevelData[rndVal][i] = 1;
            this.mLevelData[rndVal][i - 1] = 1; 
        }

        let curH = 0;
        let curW = 0;

        anchorPoints.forEach(nextH => {
            while(curH > nextH){
                curH--;
                this.mLevelData[curH][curW] = 1;
            }

            while(curH < nextH){
                curH++;
                this.mLevelData[curH][curW] = 1;
            }

            this.mLevelData[curH][curW + 2] = 1;

            this.mPath.lineTo(this._getPixelsFromPosition(curW), this._getPixelsFromPosition(curH));
            this.mPath.lineTo(this._getPixelsFromPosition(curW + 2), this._getPixelsFromPosition(curH));

            curW += 2;
        });

        this.mPath.lineTo(this._getPixelsFromPosition(w + 1), this._getPixelsFromPosition(curH));

        if(Math.floor(Math.random() * 2) == 1){
            this.mPath = this._reversePath();
        }
            
        console.log(anchorPoints);
        console.log(this.mLevelData);
    }

    private _reversePath(): Phaser.Curves.Path {
        let reversed: Phaser.Curves.Path = new Phaser.Curves.Path();

        let points = this.mPath.getPoints();
        reversed.moveTo(this.mPath.getEndPoint());

        for(let i = points.length - 1; i >= 0; i--){
            reversed.lineTo(points[i]);
        }
        
        return reversed;
    }

    private _getPixelsFromPosition(pos): number{
        return (pos + 1) * CST.CELL_SIZE - CST.CELL_SIZE / 2;
    }

}