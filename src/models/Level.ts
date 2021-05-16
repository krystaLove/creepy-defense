import { CST } from "../constants";

export default class Level{

    private mLevelData: number[][];

    constructor(){
        this._generateLevel();
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
        }
        console.log(anchorPoints);
        console.log(this.mLevelData);


    }

}